import { FETCH_EVENTS_SUCCESS, 
	FETCH_SINGLE_EVENT_SUCCESS, 
	INITIALIZE_GUESTLIST, 
	ADD_ADDITIONAL_GUEST, 
	REMOVE_GUEST, 
	REDIRECT_TO_URL, 
	CAST_VOTE_SUCCESS, 
	CLEAR_REDIRECT,
	CHANGE_RSVP_SUCCESS,
	FETCH_EVENT_TOP_GAMES_SUCCESS
} from '../actions/events';
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
		guests: [],
		gameVotes: []
	},
	currentTopGames: [
		{
			averageRating: 0,
			bggRating: 0,
			eventVotes: 0,
			gameId: 0,
			image: '',
			isExpansion: false,
			maxPlayers: 0,
			minPlayers: 0,
			name: '',
			owners: [],
			playingTime: 0,
			rank: 0,
			thumbnail: '',
			yearPublished: 0
		}
	],
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

function updateEventInState(state, action) {
	// get index of event to be updated
	const index = state.list.findIndex(event => event.eventId === action.event.eventId);
	// const updatedEvent = ...state.list[index]
	return {
		...state,
		list: [
			...state.list.slice(0,index),
			action.event,
			...state.list.slice(index+1)
		]
	};
}

function updateGameVoteInState(state, ballot) {
	// console.log(ballot);
	// const eventIndex = state.list.findIndex(event => event.eventId === ballot.eventId);

	// const updatedEvent = state.list[eventIndex];
	// const existingVote = updatedEvent.gameVotes.find(vote => vote.gameId === ballot.game.gameId);
	// find existing listing in currentTopGames
	let topGame = ballot.game; // set game to ballot game by default
	topGame.eventVotes = 0;
	let existingTopGameIndex = state.currentTopGames.length; // set index to next spot in array by default
	const existingTopGame = state.currentTopGames.find(game => game.gameId === ballot.game.gameId); 
	if (existingTopGame) {
		existingTopGameIndex = state.currentTopGames.findIndex(game => game.gameId === ballot.game.gameId); //update to actual
		topGame = existingTopGame; // update to actual
	}
	if (ballot.vote === 'yes') topGame.eventVotes ++;
	else if (ballot.vote === 'no') topGame.eventVotes --;
	else if (ballot.vote === 'want to play') topGame.eventVotes ++;	


	// strategy
	// find existing gamevote in event
	// update gamevote in array and current
	// const existingGameVote = state.current.gameVotes.find();


		
	return {
		...state,
		currentTopGames: [
			...state.currentTopGames.slice(0,existingTopGameIndex),
			topGame,
			...state.currentTopGames.slice(existingTopGameIndex+1)
		],
		current: {
			...state.current,
			gameVotes: [
				...state.current.gameVotes,

			]
		}
		// list: [
		// 	...state.list.slice(0,eventIndex),
		// 	updatedEvent,
		// 	...state.list.slice(eventIndex+1)
		// ],
		// current: updatedEvent
	};
}

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
		return updateGameVoteInState(state, action.ballot);
		// return {
		// 	...state
		// };


	case CLEAR_REDIRECT:
		return {
			...state,
			redirect: null
		};

	case CHANGE_RSVP_SUCCESS:
		return updateEventInState(state, action);

	case FETCH_EVENT_TOP_GAMES_SUCCESS:
		return {
			...state,
			currentTopGames: action.eventTopGames
		};

	default: 
		return state;
	}
}
