import { loadAuthToken } from '../local-storage';
import { API_BASE_URL } from '../config';
import { fetchSingleEventSuccess } from './events';
import { SubmissionError } from 'redux-form';
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

export const REMOVE_GAME_SUCCESS = 'REMOVE_GAME_SUCCESS';
export const removeGameSucess = (gameId) => ({
	type: REMOVE_GAME_SUCCESS,
	gameId
}); 

export const removeGameFromDB = game => {
	const authToken = loadAuthToken();
	const thisHeaders = new Headers();
	thisHeaders.append('Authorization', `Bearer ${authToken}`);
	const url = new URL(`${API_BASE_URL}collections/game/${game.gameId}`);

	return fetch(url, {
		'method': 'DELETE',
		'mode': 'cors',
		'headers': thisHeaders
	});
};

export const refreshCollection = () => (dispatch, getState) => {
	const { userId, limit, page, sort, filters } = getState().collections.list;
	dispatch(fetchCollection(userId, limit, page, sort, filters));
};

export const removeGame = game => dispatch => {
	removeGameFromDB(game)
		.then(() => {
			dispatch(removeGameSucess(game.gameId));
			dispatch(refreshCollection());
		});
};

export const ADD_GAME_EDIT = 'ADD_GAME_EDIT';
export const addGameEdit = () => ({
	type: ADD_GAME_EDIT
});

export const HANDLE_GAME_SEARCH_SUCCESS = 'HANDLE_GAME_SEARCH_SUCCESS';
export const handleGameSearchSuccess = gameSearchResults => ({
	type: HANDLE_GAME_SEARCH_SUCCESS,
	gameSearchResults
});

export const GAME_SEARCH_START = 'GAME_SEARCH_START';
export const gameSearchStart = () => ({
	type: GAME_SEARCH_START
});

export const handleGameSearch = query => dispatch => {
	dispatch(gameSearchStart());
	searchBggForGame(query)
		.then(res => {
			dispatch(handleGameSearchSuccess(res));
		});	
};

export const searchBggForGame = query => {
	const url = 'https://cors-anywhere.herokuapp.com/' 
		+ 'https://www.boardgamegeek.com/xmlapi2/search?'
		+ `query=${query}`
		+ '&type=boardgame'
		+ '&exact=0';
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

export const fetchGameFromBgg = tempGame => {
	const url = `https://bgg-json.azurewebsites.net/thing/${tempGame.gameId}`;
	return fetch(url)
		.then(res => {
			if (!res.ok) return Promise.reject(res.statusText);
			return res.json();
		})
		.catch(err => {
			console.log('error fetching bgg game', err);
			return tempGame;
		});
};

export const GAME_SELECT_START = 'GAME_SELECT_START';
export const gameSelectStart = game => ({
	type: GAME_SELECT_START,
	game
});

export const FETCH_GAME_SUCCESS = 'FETCH_GAME_SUCCESS';
export const fetchGameSuccess = game => ({
	type: FETCH_GAME_SUCCESS,
	game
});


export const selectGameByGame = tempGame => dispatch => {
	dispatch(gameSelectStart(tempGame));
	fetchGameFromBgg(tempGame)
		.then(game => dispatch(fetchGameSuccess(game)));
};

export const UPDATE_GAME_START = 'UPDATE_GAME_START';
export const updateGameStart = game => ({
	type: UPDATE_GAME_START,
	game
});

export const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS';
export const updateGameSuccess = game => ({
	type: UPDATE_GAME_SUCCESS,
	game
});

export const postGame = game => {
	const authToken = loadAuthToken();
	const url = new URL(`${API_BASE_URL}collections/add-game`);
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + authToken
		},
		body: JSON.stringify(game)
	}).then(res => res.json());
};

export const updateGame = game => dispatch  => {
	dispatch(updateGameStart(game));
	postGame(game)
		.then(() => {
			dispatch(updateGameSuccess(game));
			dispatch(refreshCollection());
		});
};

export const FETCH_USER_WANT_TO_PLAY_LIST_SUCCESS = 'FETCH_USER_WANT_TO_PLAY_LIST_SUCCESS';
export const fetchUserWantToPlayListSuccess = (userId, userWantToPlayList) => ({
	type: FETCH_USER_WANT_TO_PLAY_LIST_SUCCESS,
	userId,
	userWantToPlayList
});

export const getUserPlayList = userId => {
	const authToken = loadAuthToken();
	const url = new URL(`${API_BASE_URL}collections/${userId}/want-to-play`);
	return fetch(url, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + authToken
		}
	}).then(res => res.json());
};

export const fetchUserWantToPlayList = userId => dispatch => {
	getUserPlayList(userId)
		.then(list => dispatch(fetchUserWantToPlayListSuccess(userId, list)));
};

export const fetchBggUser = username => {
	const url = 'https://cors-anywhere.herokuapp.com/' 
	+ 'https://www.boardgamegeek.com/xmlapi2/user?'
	+ `name=${username}`
	+ '&domain=boardgame';
	return fetch(url)
		.then(res => res.text())
		.then(res => {
			let user;
			parseString(res, (err, result) => {
				if (err) console.log(err);
				if (result) user = { name: result.user.$.name, bggId: result.user.$.id };
				else return;
			});
			return user;
		})
}
export const START_BGG_USER_VALIDATION = 'START_BGG_USER_VALIDATION';
export const startBggUserValidation = () => ({
	type: START_BGG_USER_VALIDATION
})
export const END_BGG_USER_VALIDATION = 'END_BGG_USER_VALIDATION';
export const endBggUserValidation = () => ({
	type: END_BGG_USER_VALIDATION
})


export const handleBggUserSearch = query => dispatch => {
	return fetchBggUser(query)	
		.then(res => {
			if (!res.bggId) throw new Error('Not a valid BGG username');
			else {
				dispatch(handleBggUserSearchSuccess(res));
				return res;
			}
		})
		.catch(async err => {
			const resolvedError = await err;
			const {reason, message, 
				// location
			} = resolvedError;
			if (reason === 'ValidationError') {
			// Convert ValidationErrors into SubmissionErrors for Redux Form
				return Promise.reject(
					new SubmissionError({
						// [location]: message
						guests: {_error: message}
					})
				);
			}
		});
};

export const HANDLE_BGG_USER_SEARCH_SUCCESS = 'HANDLE_BGG_USER_SEARCH_SUCCESS';
export const handleBggUserSearchSuccess = bggUser => ({
	type: HANDLE_BGG_USER_SEARCH_SUCCESS,
	bggUser
});