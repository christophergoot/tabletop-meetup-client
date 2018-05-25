import { loadAuthToken } from '../local-storage';
// import { API_BASE_URL } from '../config';
const API_BASE_URL = 'http://localhost:3030/api';

export const fetchCollection = (userId) =>  dispatch => {
	const authToken = loadAuthToken();
	// const authToken = localStorage.getItem('authToken');
	// return loadAuthToken().then(authToken => { 
	const thisHeaders = new Headers();
	thisHeaders.append('Authorization', `Bearer ${authToken}`);
	fetch(`${API_BASE_URL}/collections/${userId}`, {
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

export const SORT_GAMES = 'SORT_GAMES';
export const sortGames = (games, sortMethod) => ({
	type: SORT_GAMES,
	games,
	sortMethod
});

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
