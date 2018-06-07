import { FETCH_EVENTS_SUCCESS, FETCH_SINGLE_EVENT_SUCCESS } from '../actions/events';
// import MOCK_DATA from '../mock-data';

// const { Collections } = MOCK_DATA;
const initialState = ({
	list: [
		{
			eventId: '',
			location: '',
			sort: {
				method: 'name',
				direction: 1
			},
			filters: [],
			page: 1,
			pageCount: 5,
			limit: 25,
			games: [],
			guests: []
		}
	]
});

export default function eventsReducer(state=initialState, action) {
	const { type } = action;
	switch (type) {

	case FETCH_EVENTS_SUCCESS:
		return {
			...state,
			list: action.events
		};

	case FETCH_SINGLE_EVENT_SUCCESS:
		return {
			...state,
			list: [
				action.event
			] 
		};

	default: 
		return state;
	}
}


// const events = 
// 	{	
// 		total: 1000,
// 		page: 5,
// 		totalPages,
// 		list: [
// 			{singleEvent},
// 			{}

// 		]
// 	};