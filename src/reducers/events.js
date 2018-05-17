import { FETCH_EVENT_SUCCESS } from '../actions/events';
// import MOCK_DATA from '../mock-data';

// const { Collections } = MOCK_DATA;
const initialState = ([]);

// function refreshCollection(collections, collection) {
// 	return [
// 		collections.filter(col => col.userId !== collection.userId),
// 		collection
// 	];
// }

export default function eventsReducer(state=initialState, action) {
	const { type } = action;
	switch (type) {

	case FETCH_EVENT_SUCCESS:
		return [
			...state,
			action.event
		];

	default: 
		return state;
	}
}