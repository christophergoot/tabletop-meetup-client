import { 
	FETCH_COLLECTION_SUCCESS, 
	SORT_GAMES_SUCCESS
} from '../actions/collections';

const initialState = ({
	list: {
		userId: '',
		sort: {
			method: 'name',
			direction: 1
		},
		filter: [],
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

	default: 
		return state;
	}
}