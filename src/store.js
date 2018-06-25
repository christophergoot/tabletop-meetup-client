import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import {setAuthToken, refreshAuthToken} from './actions/auth';

import authReducer from './reducers/auth';
import collectionsReducer from './reducers/collections';
import eventsReducer from './reducers/events';
// import usersReducer from './reducers/users';

import { composeWithDevTools } from 'redux-devtools-extension';

  
const store = createStore(
	combineReducers({
		form: formReducer,
		auth: authReducer,
		collections: collectionsReducer,
		events: eventsReducer,
		// users: usersReducer
	}),
	composeWithDevTools(
		applyMiddleware(thunk)
	)
);

// Hydrate the authToken from localStorage if it exists
const authToken = loadAuthToken();
if (authToken) {
	const token = authToken;
	store.dispatch(setAuthToken(token));
	store.dispatch(refreshAuthToken());
}

export default store;