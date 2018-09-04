import { FETCH_EVENTS_SUCCESS, 
	FETCH_SINGLE_EVENT_SUCCESS, 
	INITIALIZE_GUESTLIST, 
	ADD_ADDITIONAL_GUEST, 
	REMOVE_GUEST, 
	REDIRECT_TO_URL, 
	CAST_VOTE_SUCCESS, 
	CLEAR_REDIRECT,
	CHANGE_RSVP_SUCCESS,
	FETCH_EVENT_TOP_GAMES_SUCCESS,
	UPDATE_EVENT_VOTE,
	FETCH_EVENTS_BEGIN
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
	listIsLoading: false,
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
	const { userId } = ballot;
	const gameVotes = state.current.gameVotes;

	if (ballot.vote === 'yes' || ballot.vote === 'no') {
		let i = gameVotes.length; // initialize at new position in index
		const v = ballot.vote;
		if (gameVotes.find(doc => doc.gameId === ballot.game.gameId)) { // (game has existing score card)
			// update index with existing location
			i = gameVotes.findIndex(doc => doc.gameId === ballot.game.gameId);

			// find existing vote (if exists) and remove it
			const indexOfYes = gameVotes[i].yes.indexOf(userId);
			const indexOfNo = gameVotes[i].no.indexOf(userId);
			if (indexOfYes >= 0) gameVotes[i].yes.splice(indexOfYes, 1);
			if (indexOfNo >= 0) gameVotes[i].no.splice(indexOfNo, 1);
		} else { // add new scorescard gamevotes
			gameVotes.push({
				gameId: ballot.game.gameId,
				yes: [],
				no: []
			});
		}
		gameVotes[i][v].push(ballot.userId);	
	}

	return {
		...state,
		current: {
			...state.current,
			gameVotes: [
				...gameVotes
			]
		}
	};
}

function updateEventVotes(state, ballot) {
	let topGame = ballot.game; // set game to ballot game by default
	topGame.eventVotes = 0;
	let existingTopGameIndex = state.currentTopGames.length; // set index to next spot in array by default
	const existingTopGame = state.currentTopGames.find(game => game.gameId === ballot.game.gameId); 
	if (existingTopGame) {
		existingTopGameIndex = state.currentTopGames.findIndex(game => game.gameId === ballot.game.gameId); //update to actual
		topGame = existingTopGame; // update to actual
	}

	if (ballot.vote === 'yes') {
		topGame.eventVotes ++;
	} else if (ballot.vote === 'no') {
		topGame.eventVotes --;
	} else if (ballot.vote === 'want to play') {
		topGame.eventVotes ++;
	}

	return {
		...state,
		currentTopGames: [
			...state.currentTopGames.slice(0,existingTopGameIndex),
			topGame,
			...state.currentTopGames.slice(existingTopGameIndex+1)
		],
	};
}

export default function eventsReducer(state=initialState, action) {
	const { type } = action;
	switch (type) {

	case FETCH_EVENTS_SUCCESS:
		return {
			...state,
			list: action.events,
			listIsLoading: false
		};

	case FETCH_EVENTS_BEGIN:
		return {
			...state,
			listIsLoading: true
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
	
	case UPDATE_EVENT_VOTE:
		return updateEventVotes(state, action.ballot);

	default: 
		return state;
	}
}
