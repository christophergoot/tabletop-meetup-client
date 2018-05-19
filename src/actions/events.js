import { API_BASE_URL } from '../config';
import {loadAuthToken} from '../local-storage';

export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENT_SUCCESS';
export const fetchEventsSuccess = events => ({
	type: FETCH_EVENTS_SUCCESS,
	events
});

export const fetchEvents = () => dispatch => {
	const authToken = loadAuthToken();
	return fetch(`${API_BASE_URL}/events/`, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + authToken
		},
		method: 'GET'
	}).then(res => {
		if (!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	}).then(res => {
		dispatch(fetchEventsSuccess(res));
	});
};
