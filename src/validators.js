import { handleBggUserSearch } from './actions/collections';
import { checkUsername } from './actions/users';

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

export const isRegisteredUser = (values /*, dispatch */) => {
	return checkUsername
		.then(res => {
			if (!res) {
				throw { username: 'That username is taken' };
			}
		});
};

export const isBggUser = value => {
	const searchValue = value || '';
	return handleBggUserSearch(searchValue)
		.then(res => {
			console.log(res);
			if (res.user.id === '') return 'Invalid BGG Username';
		});	
};