import { SubmissionError } from 'redux-form';
import { loadAuthToken } from '../local-storage';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const FETCH_ALL_USERS_SUCCESS = 'FETCH_ALL_USERS_SUCCESS';
export const fetchAllUsersSuccess = allUsers => ({
	type: FETCH_ALL_USERS_SUCCESS,
	allUsers
});


export const getAllUsers = () => dispatch => {
	const authToken = loadAuthToken();
	return fetch(`${API_BASE_URL}users/`, {
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + authToken
		}
	})
		.then(res => normalizeResponseErrors(res))
		// .then(res => res.body)
		.then(res => res.json())
		.then(res => dispatch(fetchAllUsersSuccess(res.userList)))
		.catch(err => {
			const {reason, message, location} = err;
			if (reason === 'ValidationError') {
				// Convert ValidationErrors into SubmissionErrors for Redux Form
				return Promise.reject(
					new SubmissionError({
						[location]: message
					})
				);
			}
		});
};

export const registerUser = user => dispatch => {
	return fetch(`${API_BASE_URL}users`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.catch(err => {
			const {reason, message, location} = err;
			if (reason === 'ValidationError') {
				// Convert ValidationErrors into SubmissionErrors for Redux Form
				return Promise.reject(
					new SubmissionError({
						[location]: message
					})
				);
			}
		});
};