import { FETCH_COLLECTION_SUCCESS } from '../actions/collections';
// import MOCK_DATA from '../mock-data';

// const { Collections } = MOCK_DATA;
const initialState = ({
	list: {
		userId: '',
		games:[]
	}
});

// function refreshCollection(collections, collection) {
// 	return [
// 		collections.filter(col => col.userId !== collection.userId),
// 		collection
// 	];
// }

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