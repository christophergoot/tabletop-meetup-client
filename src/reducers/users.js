import { FETCH_ALL_USERS_SUCCESS } from '../actions/users';

const initialState = {
	allUsers: [
		{displayName: '', userId: ''}
	]
};

export default function reducer(state = initialState, action) {
	const { type } = action;
	switch (type) {

	case FETCH_ALL_USERS_SUCCESS: 
		return {
			...state, 
			allUsers: [
				action.allUsers
			]
		};

	// case FETCH_SINGLE_EVENT_SUCCESS:
	// 	return {
	// 		...state,
	// 		list: [
	// 			action.event
	// 		] 
	// 	};

	default: 
		return state;
	}
}