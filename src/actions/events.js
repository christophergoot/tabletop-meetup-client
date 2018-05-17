import { API_BASE_URL } from '../config';

export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENT_SUCCESS';
export const fetchEventsSuccess = events => ({
	type: FETCH_EVENTS_SUCCESS,
	events
});

export const fetchEvents = (userId) => dispatch => {
	fetch(`${API_BASE_URL}/events/user/${userId}`).then(res => {
		if (!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	}).then(res => {
		dispatch(fetchEventsSuccess(res));
	});
};
