import { loadAuthToken } from '../local-storage';
import { API_BASE_URL } from '../config';
import { fetchSingleEventSuccess } from './events';
// import xml2json from 'xml2json';
import { parseString } from 'xml2js';

export const fetchCollection = (userId, limit, page, sort, filters) =>  dispatch => {
	const uri = `collections/${userId}/`;
	manageGameList(uri, limit, page, sort, filters)
		.then(res => {
			if (!res.ok) {
				return Promise.reject(res.statusText);
			}
			return res.json();
		})
		.then(res => {
			dispatch(fetchCollectionSuccess(res));
		});
};

export const fetchSingleEvent = (userId, limit, page, sort, filters) =>  dispatch => {
	const uri = `events/${userId}/`;
	manageGameList(uri,limit, page, sort, filters)
		.then(res => {
			if (!res.ok) {
				return Promise.reject(res.statusText);
			}
			return res.json();
		})
		.then(res => {
			dispatch(fetchSingleEventSuccess(res));
		});
};

export const manageGameList = (uri, limit, page, sort, filters)  => {
	const authToken = loadAuthToken();
	// collectionType will be either 'events' or 'collections'
	const url = new URL(`${API_BASE_URL}${uri}`);
	let sortMethod = 'name',
		sortDirection = 1;
	if (sort) {
		sortMethod = sort.method;
		sortDirection = sort.direction;
	}

	const params = {
		sortMethod,
		sortDirection,
		limit: limit || 25,
		page: page || 1
	};

	if (filters && filters.length>0) filters.forEach(filter => {
		if (filter.range) params[filter.field] = `${filter.range.min}:${filter.range.max}`;
		else if (filter.value) params[filter.field] = filter.value;
	});


	Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

	const thisHeaders = new Headers();
	thisHeaders.append('Authorization', `Bearer ${authToken}`);

	return fetch(url, {
		'method': 'GET',
		'mode': 'cors',
		'headers': thisHeaders
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

export const ADD_GAME_EDIT = 'ADD_GAME_EDIT';
export const addGameEdit = () => ({
	type: ADD_GAME_EDIT
});

export const HANDLE_GAME_SEARCH_SUCCESS = 'HANDLE_GAME_SEARCH_SUCCESS';
export const handleGameSearchSuccess = gameSearchResults => ({
	type: HANDLE_GAME_SEARCH_SUCCESS,
	gameSearchResults
});

export const handleGameSearch = query => dispatch => {
	searchBggForGame(query)
		.then(res => {
			dispatch(handleGameSearchSuccess(res));
		});	
};

export const searchBggForGame = query => {
	const url = 'http://cors-anywhere.herokuapp.com/' 
		+ 'https://www.boardgamegeek.com/xmlapi2/search?'
		+ `query=${query}`
		+ '&type=boardgame'
		+ '&exact=1';
	return fetch(url)
		.then(res => res.text())
		.then(res => {
			let gameList =[];
			parseString(res, (err, result) => {
				if (err) console.log(err);
				if (result.items && result.items.item) result.items.item.forEach(game => {
					let name = '', yearPublished = '';
					if (game.name[0]) name = game.name[0].$.value;
					if (game.yearpublished) yearPublished = game.yearpublished[0].$.value;
					gameList.push({
						id: game.$.id,
						name,
						yearPublished
					});
				});
			});
			return gameList;	
		});
};

export const addGameById = gameId => {
	console.log('you selected game with id ' + gameId);
	return gameId;
};