import { 
	FETCH_COLLECTION_SUCCESS, 
	SORT_GAMES_SUCCESS,
	ADD_GAME_EDIT,
	HANDLE_GAME_SEARCH_SUCCESS,
	GAME_SEARCH_START,
	GAME_SELECT_START,
	FETCH_GAME_SUCCESS,
	UPDATE_GAME_SUCCESS,
	FETCH_USER_WANT_TO_PLAY_LIST_SUCCESS,
	HANDLE_BGG_USER_SEARCH_SUCCESS,
	START_BGG_USER_VALIDATION,
	END_BGG_USER_VALIDATION,
	WANT_TO_PLAY_SUCCESS
} from '../actions/collections';

const initialState = ({
	addGame: {
		gameSearchResults: [],
		gameSearchDrop: 'search',
		currentSearches: 0,
		selectedGame: {}
	},
	list: {
		userId: '',
		sort: {
			method: 'name',
			direction: 1
		},
		filters: [],
		page: 1,
		limit: 25,
		games:[]
	},
	wantToPlayLists: [],
	bggUserSearch: {
		results: '',
		validating: false
	}
});

function updateWantToPlayInState(state, ballot) {
	// find wantToPlayList
	const wantToPlay = state.wantToPlayLists.find(list => list.userId === ballot.userId);
	const prevWantedI = wantToPlay.list.findIndex(id => id === ballot.game.gameId);
	if (prevWantedI >= 0) { // want to play list previously contained game
		wantToPlay.list.splice(prevWantedI, 1); // remove game
	} else { // want to play list did not contain game
		wantToPlay.list.push(ballot.game.gameId); // add game
	}

	return {
		...state,
		wantToPlayLists: [
			...state.wantToPlayLists.filter(list => list.userId !== ballot.userId),
			{ ...wantToPlay }
		]
	};


}

export default function collectionsReducer(state=initialState, action) {
	const { type } = action;
	switch (type) {

	case FETCH_COLLECTION_SUCCESS:
		return {
			...state,
			list: action.collection
		};

	case SORT_GAMES_SUCCESS:
		return {
			...state,
			list: action.collection
		};

	case ADD_GAME_EDIT:
		return {
			...state,
			addGame: {
				isEditing: !state.addGame.isEditing
			}
		};

	case HANDLE_GAME_SEARCH_SUCCESS:
		return {
			...state,
			addGame: {
				...state.addGame,
				gameSearchResults: action.gameSearchResults,
				currentSearches: state.addGame.currentSearches - 1
			}
		};
	
	case GAME_SEARCH_START:
		return {
			...state,
			addGame: {
				...state.addGame,
				currentSearches: state.addGame.currentSearches + 1,
				gameSearchDrop: 'search'
			}
		};

	case GAME_SELECT_START:
		return {
			...state,
			addGame: {
				...state.addGame,
				currentSearches: state.addGame.currentSearches + 1,
				selectedGame: action.game,
				gameSearchDrop: 'select'
			}
		};

	case FETCH_GAME_SUCCESS:
		return {
			...state,
			addGame: {
				...state.addGame,
				currentSearches: state.addGame.currentSearches - 1,
				selectedGame: action.game
			}
		};

	case UPDATE_GAME_SUCCESS:
		return {
			...state,
			addGame: {
				...state.addGame,
				gameSearchDrop: 'search',
				gameSearchResults: []
			},
		};

	case FETCH_USER_WANT_TO_PLAY_LIST_SUCCESS:
		return {
			...state,
			wantToPlayLists: [
				...state.wantToPlayLists.filter(list => list.userId !== action.userId),
				{
					userId: action.userId,
					list: action.userWantToPlayList
				}
			]
		};
	
	case HANDLE_BGG_USER_SEARCH_SUCCESS:
		return {
			...state, 
			bggUserSearch: {
				...state.bggUserSearch,
				results: action.bggUser
			}
		};
	case START_BGG_USER_VALIDATION:
		return {
			...state,
			bggUserSearch: {
				...state.bggUserSearch,
				validating: true
			}
		};
	case END_BGG_USER_VALIDATION:
		return {
			...state,
			bggUserSearch: {
				...state.bggUserSearch,
				validating: false
			}
		};

	case WANT_TO_PLAY_SUCCESS:
		return updateWantToPlayInState(state, action.ballot);

	default: 
		return state;
	}
}