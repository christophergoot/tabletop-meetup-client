import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';

import authReducer from './reducers/auth';
import protectedDataReducer from './reducers/protected-data';
import tabletopMeetupReducer from './reducers/tabletopmeetup';
import sessionReducer from './reducers/session';


import {setAuthToken, refreshAuthToken} from './actions/auth';



const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
		protectedData: protectedDataReducer,
		tabletopmeetup: tabletopMeetupReducer,
		session: sessionReducer
    }),
    applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exists
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;