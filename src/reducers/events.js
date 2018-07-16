import { FETCH_EVENTS_SUCCESS, FETCH_SINGLE_EVENT_SUCCESS, INITIALIZE_GUESTLIST, 
	ADD_ADDITIONAL_GUEST, REMOVE_GUEST, REDIRECT_TO_URL, CAST_VOTE_SUCCESS } from '../actions/events';
import { FETCH_ALL_USERS_SUCCESS } from '../actions/users';

const initialState = ({
	redirect: null,
	guestList: [
		{
			userId: ''
		}
	],
	allUsers: [
		{
			displayName: '',
			userId: ''
		}
	],
	current: {
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
	},
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
			],
			current: action.event
		};

	case FETCH_ALL_USERS_SUCCESS: 
		return {
			...state, 
			allUsers: action.allUsers
		};

	case ADD_ADDITIONAL_GUEST:
		return {
			...state,
			guestList: [
				...state.guestList,
				{userId: '', displayName: ''}
			]
		};

	case INITIALIZE_GUESTLIST:
		return {
			...state,
			guestList: [action.host]
		};

	case REMOVE_GUEST:
		return {
			...state,
			guestList: [
				...state.guestList.slice(0,action.i),
				...state.guestList.slice(action.i + 1)
			]
		};
	
	case REDIRECT_TO_URL:
		return {
			...state,
			redirect: action.url
		};

	case CAST_VOTE_SUCCESS:
		return {
			...state,
			// list: [
			// 	...state.list,
			// 	{ eventId: action.ballot.eventId,
			// 		gameVotes: [
			// 			{
			// 				gameId: action.ballot.gameId,
							
			// 			}
			// 		]
			// ]
			// action.ballot (looks like): { gameId, eventId, vote }
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