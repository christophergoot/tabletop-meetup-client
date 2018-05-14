import { LOGIN, LOGOUT, EDIT_GAME, REMOVE_GAME, SORT_GAMES } from '../actions/tabletopmeetup';
import MOCK_DATA from '../mock-data';

const { Events, Collections, Users } = MOCK_DATA;

// const currentUserName = Users[Math.floor(Math.random()*Users.length)].userName;
const currentUserName = 'goot';
const initialState = {
	collections: Collections,
	users: Users,
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

	const sorted = games.sort((a,b) => {
		// return a[method] - b[method]
		if (a[method] < b[method]) {
			return -1;
		} 

		if (a[method] > b[method]) {
			return 1;
		} 

		return 0;
	})
	return sorted;
}

// export const tabletopMeetupReducer = (state=initialState, action) => {
export default function tabletopMeetupReducer(state=initialState, action) {
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
				collection: Object.assign({}, state.collection, {
					sort: { method: action.sortMethod},
					games: sortGamesByMethod(action.games, action.sortMethod)
				})		
			}

		default: 
			return state;
	}
}
