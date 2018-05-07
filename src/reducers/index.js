import { LOGIN, LOGOUT, EDIT_GAME, REMOVE_GAME, SORT_GAMES } from '../actions';
import MOCK_DATA from '../mock-data';

const { Events, Collections, Users } = MOCK_DATA;

// const currentUserName = Users[Math.floor(Math.random()*Users.length)].userName;
const currentUserName = 'goot';
const initialState = {
	collections: Collections,
	collection: Collections.find(coll => coll.userName === currentUserName),
	events: Events,
	currentUser: currentUserName,
	loggedIn: false
};

function rejectGameById(collection, gameId) {
	console.log(gameId);
	return collection.filter(game => game.gameId !== gameId);
}

function updateGameById(collection, updatedGame) {
	return [
		...collection.filter(game => game.gameId !== updatedGame.gameId),
		updatedGame
	];
}

function sortGamesByMethod(games, method) {
	// possible methods: name, rating, playTime, weight, year
	return [
		...games
	];
}

export const tabletopMeetupReducer = (state=initialState, action) => {
	const { type } = action;
	switch (type) {
		case LOGOUT:
			return { ...state, loggedIn: false };

		case LOGIN:
			return {...state, loggedIn: true };

		case REMOVE_GAME:
			return {
				...state, 
				collection: rejectGameById(state.collection, action.gameId)
			}

		case EDIT_GAME:
			return {
				...state,
				collection: updateGameById(state.collection, action.game)
			}

		case SORT_GAMES: // recieves action.games && action.sortMethod
			console.log('sorting by ' + action.sortMethod);
			return {
				...state,
				// collection: sortGamesByMethod(action.games, action.sortMethod)
			}

		default: 
			return state;
	}


	
	// if (action.type === actions.LOGIN) {
	// 	return Object.assign({}, state, {
	// 		loggedIn: true
	// 	});
	// }
	// if (action.type === actions.EDIT_GAME) {
	// 	return Object.assign({}, state, {
			
	// 	});
	// }
	// if (action.type === actions.REMOVE_GAME) {
	// 	const newCollection = state.collection.filter(game => 
	// 		(game.gameId !== action.gameId));
	// 	return Object.assign({}, state, {
	// 		collection: newCollection
	// 	})
	// }
	// return state;
}