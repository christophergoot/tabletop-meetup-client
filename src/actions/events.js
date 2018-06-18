import { API_BASE_URL } from '../config';
import { loadAuthToken } from '../local-storage';

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
			return Promise.reject(res.statusText);
		}
		return res.json();
	}).then(res => {
		dispatch(createNewEventSuccess(res));
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
