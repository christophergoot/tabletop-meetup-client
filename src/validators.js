import { fetchBggUser, 
	// startBggUserValidation, endBggUserValidation 
} from './actions/collections';
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

// export const isRegisteredUser = (value, allValues) => {
// 	console.log(value, allValues);
// 	return checkUsername(value, allValues.indexOf(value))
// 		? false
// 		: 'Invalid Tabletop Meetup Username';
// };

// export const isRegisteredUser = (values /*, dispatch */) => {
// 	return checkUsername
// 		.then(res => {
// 			if (!res) {
// 				throw new Error({ username: 'That username is taken' });
// 			}
// 		});
// };

// To provide asynchronous validation, provide redux-form with an 
// asynchronous validation function (asyncValidate) that 
// takes an object of form values, and the Redux dispatch function, 
// and returns a promise that either rejects with an object of errors or resolves.

// You will also need to specify which fields should fire the 
// asynchronous validation when they are blurred with the 
// asyncBlurFields config property.



export const isBggUser = value => {
	// dispatch(startBggUserValidation());
	const searchValue = value.bggUsername.trim() || '';
	// return new Promise((resolve) => {
	return fetchBggUser(searchValue)
		// handleBggUserSearch(searchValue)
		.then(res => {
			// dispatch(endBggUserValidation());
			if (res.bggId === '') throw new Error({ bggUsername: 'Invalid BGG Username' });
			else return Promise.resolve;
		});	

};
