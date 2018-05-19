import { API_BASE_URL } from '../config';
import { loadAuthToken } from '../local-storage';

export const FETCH_COLLECTION_SUCCESS = 'FETCH_COLLECTION_SUCCESS';
export const fetchCollectionSuccess = collection => ({
	type: FETCH_COLLECTION_SUCCESS,
	collection
});

export const fetchCollection = (userId) => dispatch => {
	const authToken = loadAuthToken();
	fetch(`${API_BASE_URL}/collections/${userId}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${authToken}`
		}
	}).then(res => {
		if (!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	}).then(res => {
		dispatch(fetchCollectionSuccess(res));
	});
};
