import { FETCH_EVENTS_SUCCESS } from '../actions/events';
// import MOCK_DATA from '../mock-data';

// const { Collections } = MOCK_DATA;
const initialState = ({
	list: [
		{
			eventId: '',
			location: '',
			games: {
				list: []
			},
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