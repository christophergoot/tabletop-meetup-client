import { 
	FETCH_COLLECTION_SUCCESS, 
} from '../actions/collections';

const initialState = ({
	list: {
		userId: '',
		games:[]
	}
});

export default function collectionsReducer(state=initialState, action) {
	const { type } = action;
	console.log(state,action);
	switch (type) {

	case FETCH_COLLECTION_SUCCESS:
		return {
			...state,
			list: action.collection
		};

	default: 
		return state;
	}
}