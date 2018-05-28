import { loadAuthToken } from '../local-storage';
import { API_BASE_URL } from '../config';
// const API_BASE_URL = 'http://localhost:3030/api';
import { fetchEvent } from './events';

export const fetchCollection = (userId, limit, page, sort, filter) =>  dispatch => {
	const authToken = loadAuthToken();

	const url = new URL(`${API_BASE_URL}/collections/${userId}`);
	let sortMethod = 'name',
		sortDirection = 1;
	if (sort) sortMethod = sort.method, sortDirection = sort.direction;
	const skip = (page - 1) * limit;
	const params = {
		sortMethod,
		sortDirection,
		limit: limit || 25,
		skip: skip || 0,
		filter: filter || 'owned'
	};
	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

	const thisHeaders = new Headers();
	thisHeaders.append('Authorization', `Bearer ${authToken}`);

	fetch(url, {
		'method': 'GET',
		'mode': 'cors',
		'headers': thisHeaders
	}).then(res => {
		if (!res.ok) {
			return Promise.reject(res.statusText);
		}
		return res.json();
	}).then(res => {
		dispatch(fetchCollectionSuccess(res));
	});
};


export const FETCH_COLLECTION_SUCCESS = 'FETCH_COLLECTION_SUCCESS';
export const fetchCollectionSuccess = collection => ({
	type: FETCH_COLLECTION_SUCCESS,
	collection
});

export const SORT_GAMES_SUCCESS = 'SORT_GAMES_SUCCESS';
export const sortGamesSuccess = games => ({
	type: SORT_GAMES_SUCCESS,
	games
});

// export const sortGames = (listType, listId, sortMethod) =>  dispatch => {
// //will get a reference to a gamelist, and a sort method
// //if collection, launch fetchCollection
// //	need to make sure eftchCollectionSuccess updates sort in the state
// // (userId, limit, page, sort, filter) 
// 	if (listType === 'collection') {
// 		// const sort 
// 		dispatch(fetchCollection(listId,limit,sort,filter));
// 	}
// 	if (listType === 'event') dispatch(fetchEvent(listId,limit,sort,filter));
// //if event gameList, launch get event
// //	save sort, filter, etc in state

// };

export const EDIT_GAME = 'EDIT_GAME';
export const editGame = (gameId) => ({
	type: EDIT_GAME,
	gameId
});

export const REMOVE_GAME = 'REMOVE_GAME';
export const removeGame = (gameId) => ({
	type: REMOVE_GAME,
	gameId
}); 
