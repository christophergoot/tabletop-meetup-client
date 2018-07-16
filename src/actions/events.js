import { API_BASE_URL } from '../config';
import { loadAuthToken } from '../local-storage';
import { updateGame, postGame } from './collections';


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
		// console.log()
		if (!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	}).then(res => {
		// dispatch();
		const url = '/event/' + res._id;
		dispatch(redirectToUrl(url));
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
		dispatch(fetchSingleEventSuccess(res));
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

export const castVote = ballot => dispatch => {
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
			dispatch(fetchSingleEvent(ballot.eventId));
		});	

	// } else if (ballot.vote === 'wantToPlay') {
	// 	const game = {
	// 		gameId: ballot.game,
	// 		wantToPlay: true
	// 	};
	// 	dispatch(updateGame(game));
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
		.then(() => dispatch(redirectToUrl('/events')))
		.catch(err => {
			console.log('error', err);
		});
};