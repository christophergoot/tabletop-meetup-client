import { LOGIN, LOGOUT, EDIT_GAME, REMOVE_GAME } from '../actions';
import { MOCK_PLAYER_EVENTS, MOCK_PLAYER_COLLECTION } from '../components/mock-data';


const initialState = {
	loggedIn: true,
	collection: MOCK_PLAYER_COLLECTION,
	events: MOCK_PLAYER_EVENTS
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