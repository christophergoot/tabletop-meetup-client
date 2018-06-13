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
	console.log(field, value, allValues);
	return field in allValues && value.trim() === allValues[field].trim()
		? undefined
		: 'Does not match';
};

export const isBggUser = bggUsername => {
	// const url = `https://www.boardgamegeek.com/xmlapi2/user?name=${bggUsername}`;
	const url = 'https://www.boardgamegeek.com/xmlapi2/user?name=goot';
	return fetch(url)
		.then(res => res.text())
		// .then(res => parseString(res))
		// .then(res => parser.toJson(res))
		.then(res => JSON.stringify(res))
		.then(res => {
			if (res.user.id === '') return 'Invalid BGG Username';
		});	
};