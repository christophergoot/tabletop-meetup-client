import React from 'react';
import { createStore } from 'redux';
import { tabletopMeetupReducer } from './reducers';
// import { MOCK_DATA } from './mock-data';
import { Collections } from './mock-data/collections';
import { Users } from './mock-data/users';
import { Events } from './mock-data/events';

// const currentUserName = Users[Math.floor(Math.random())*Users.length].userName;

// const initialState = {
// 	collections: Collections,
// 	collection: Collections.find(games => games.userName === currentUserName),
// 	events: Events,
// 	currentUser: currentUserName
// };

// export default createStore(tabletopMeetupReducer, initialState);

export default createStore(tabletopMeetupReducer);