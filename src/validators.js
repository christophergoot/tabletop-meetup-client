import { fetchBggUser, 
	// startBggUserValidation, endBggUserValidation 
} from './actions/collections';
import { checkUsername } from './actions/users';
// import { checkUsername } from './actions/users';

// import { parseString } from 'xml2js';
// import {parser} from 'xml2json';

export const required = value => (value ? undefined : 'Required');
export const nonEmpty = value =>
	value.trim() !== '' ? undefined : 'Cannot be empty';
export const isTrimmed = value =>
	value.trim() === value ? undefined : 'Cannot start or end with whitespace';
export const length = length => value => {
	if (length.min && value.length < length.min) {
		return `Must be at least ${length.min} characters long`;
	}
	if (length.max && value.length > length.max) {
		return `Must be at most ${length.max} characters long`;
	}
};
export const matches = field => (value, allValues) => {
	return field in allValues && value.trim() === allValues[field].trim()
		? undefined
		: 'Does not match';
};

export const asyncValidateNewRegistration = (value, dispatch, props, field) => {
	return new Promise((resolve, reject) => {
		if (value.bggUsername && field === 'bggUsername') {
			return fetchBggUser(value.bggUsername)
				.then(res => {
					// eslint-disable-next-line
					if (res.bggId === '' && value.bggUsername) throw { bggUsername: 'Invalid BGG Username' };
					// resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		}
		if (value.username && field === 'username') {
			return checkUsername(value.username)
				.then(res => {
					if (res) reject({ username: 'Username is already taken'});
					// else resolve(res);
				})
				.catch(err => {
					reject(err);
				});
		}
		resolve();
	});
};



export const isBggUser = value => {
	// dispatch(startBggUserValidation());
	const searchValue = value.bggUsername || '';
	// return new Promise((resolve) => {
	return fetchBggUser(searchValue)
		// handleBggUserSearch(searchValue)
		.then(res => {
			// dispatch(endBggUserValidation());
			if (res.bggId === '') throw new Error('Invalid BGG Username');
			else return res;
		});	

};
