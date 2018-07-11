import { 
	FETCH_COLLECTION_SUCCESS, 
	SORT_GAMES_SUCCESS,
	ADD_GAME_EDIT,
	HANDLE_GAME_SEARCH_SUCCESS,
	GAME_SEARCH_START
} from '../actions/collections';

const initialState = ({
	addGame: {
		gameSearchResults: [],
		gameSearchDrop: 'search',
		currentSearches: 0
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
	}
});

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
				currentSearches: state.addGame.currentSearches + 1
			}
		};

	default: 
		return state;
	}
}