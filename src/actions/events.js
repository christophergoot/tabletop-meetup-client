import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { loadAuthToken } from '../local-storage';
import { postGame, 
	// fetchUserWantToPlayList 
} from './collections';


export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENT_SUCCESS';
export const fetchEventsSuccess = events => ({
	type: FETCH_EVENTS_SUCCESS,
	events
});

export const FETCH_SINGLE_EVENT_SUCCESS = 'FETCH_SINGLE_EVENT_SUCCESS';
export const fetchSingleEventSuccess = event => ({
	type: FETCH_SINGLE_EVENT_SUCCESS,
	event
});

export const CREATE_NEW_EVENT_SUCCESS = 'CREATE_NEW_EVENT_SUCCESS';
export const createNewEventSuccess = event => ({
	type: CREATE_NEW_EVENT_SUCCESS,
	event
});

export const REDIRECT_TO_URL = 'REDIRECT_TO_URL';
export const redirectToUrl = url => ({
	type: REDIRECT_TO_URL,
	url
});

export const CLEAR_REDIRECT = 'CLEAR_REDIRECT';
export const clearRedirect = () => ({
	type: CLEAR_REDIRECT
});

export const redirect = url => dispatch => {
	dispatch(redirectToUrl(url));
	dispatch(clearRedirect());
};

export const createNewEvent = newEvent => dispatch => {
	const authToken = loadAuthToken();
	return fetch(`${API_BASE_URL}events/`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + authToken
		},
		body: JSON.stringify(newEvent)
	}).then(res => {
		if (!res.ok) {
			return Promise.reject(res.json());
		}
		return res.json();
	}).then(res => {
		const url = '/event/' + res.eventId;
		if (!url) throw new Error('event was not created successfully');
		dispatch(redirect(url));
	})
		.catch(async err => {
			const resolvedError = await err;
			const {reason, message, 
				// location
			} = resolvedError;
			if (reason === 'ValidationError') {
			// Convert ValidationErrors into SubmissionErrors for Redux Form
				return Promise.reject(
					new SubmissionError({
						// [location]: message
						guests: {_error: message}
					})
				);
			}
		});
};

export const fetchSingleEvent = (eventId) => dispatch => {
	const authToken = loadAuthToken();
	return fetch(`${API_BASE_URL}events/${eventId}`, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + authToken
		}
	}).then(res => {
		if (!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	}).then(res => {
		if (res.eventId) dispatch(fetchSingleEventSuccess(res));
	});	
};

export const fetchEvents = () => dispatch => {
	const authToken = loadAuthToken();
	return fetch(`${API_BASE_URL}events/`, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + authToken
		}
	}).then(res => {
		if (!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	}).then(res => {
		dispatch(fetchEventsSuccess(res));
	});
};

export const ADD_ADDITIONAL_GUEST = 'ADD_ADDITIONAL_GUEST';
export const addAdditionalGuest = () => ({
	type: ADD_ADDITIONAL_GUEST
});

export const INITIALIZE_GUESTLIST = 'INITIALIZE_GUESTLIST';
export const initializeGuestList = host => ({
	type: INITIALIZE_GUESTLIST,
	host
});

export const REMOVE_GUEST = 'REMOVE_GUEST';
export const removeGuestFromGuestList = i => ({
	type: REMOVE_GUEST,
	i
});

export const CAST_VOTE_SUCCESS = 'CAST_VOTE_SUCCESS';
export const castVoteSuccess = ballot => ({
	type: CAST_VOTE_SUCCESS,
	ballot
});

export const castVote = ballot => (dispatch, getState) => {
	const userId = getState().auth.currentUser.userId;
	ballot.userId = userId;
	if (ballot.vote === 'yes' | ballot.vote === 'no') {
		const authToken = loadAuthToken();
		return fetch(`${API_BASE_URL}events/${ballot.eventId}/cast-vote`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + authToken
			},
			body: JSON.stringify(ballot)
		}).then(res => {
			if (!res.ok) {
				return Promise.reject(res.statusText);
			}
			return res.json();
		}).then(() => {
			dispatch(castVoteSuccess(ballot));
			// dispatch(fetchSingleEvent(ballot.eventId));
		});	

	} else if (ballot.vote === 'wantToPlay') {
		let wantToPlay = true;
		const wantList = getState().collections.wantToPlayLists.find(list => list.userId === userId).list;
		// const wantExists = wantList.contains(ballot.game.gameId);
		if (wantList.includes(ballot.game.gameId)) wantToPlay = false;
		const game = {
			...ballot.game,
			wantToPlay
		};
		// return updateGame(game)
		postGame(game)
		// return dispatch(updateGame(game))
			.then(() => {
				// const userId = getState().auth.currentUser.userId;
				// dispatch(fetchUserWantToPlayList(userId));
				dispatch(castVoteSuccess(ballot));
				// dispatch(fetchSingleEvent(ballot.eventId));
			});
	// } else if (ballot.vote === 'hide') {
	// 	// alert('We\'ll hide this from you in the future');
	} 
};

export const deleteEvent = eventId => dispatch => {
	const authToken = loadAuthToken();
	return fetch(`${API_BASE_URL}events/delete/${eventId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + authToken
		}
	})
		// .then(res => res.json())
		.then(() => dispatch(redirect('/events')))
		.catch(err => {
			console.log('error', err);
		});
};

export const changeRsvp = (eventId, rsvp) => (dispatch, getState) => {
	const authToken = loadAuthToken();
	const userId = getState().auth.currentUser.userId;
	return fetch(`${API_BASE_URL}events/${eventId}/rsvp`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + authToken
		},
		body: JSON.stringify({rsvp})
	})
		.then(res => res.json())
		// .then(event => dispatch(fetchSingleEvent(event.eventId)))
		.then(event => dispatch(changeRsvpSuccess(userId, rsvp, event)))
		.catch(err => {
			console.log('error', err);
		});
};

export const CHANGE_RSVP_SUCCESS = 'CHANGE_RSVP_SUCCESS';
export const changeRsvpSuccess = (userId, rsvp, event) => ({
	type: CHANGE_RSVP_SUCCESS,
	userId,
	rsvp,
	event
});

export const fetchEventTopGames = eventId => (dispatch, getState) => {
	const authToken = loadAuthToken();
	return fetch(`${API_BASE_URL}events/${eventId}/top-games`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + authToken
		}
	}).then(res => {
		if (!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	}).then(eventTopGames => {
		dispatch(fetchEventTopGamesSuccess(eventTopGames));
		// dispatch(fetchSingleEvent(ballot.eventId));
	});	

};

export const FETCH_EVENT_TOP_GAMES_SUCCESS = 'FETCH_EVENT_TOP_GAMES_SUCCESS';
export const fetchEventTopGamesSuccess = eventTopGames => ({
	type: FETCH_EVENT_TOP_GAMES_SUCCESS,
	eventTopGames
});
