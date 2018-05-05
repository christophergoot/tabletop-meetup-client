import React from 'react';
import { createStore } from 'redux';
import { tabletopMeetupReducer } from './reducers';
// import { MOCK_DATA } from './mock-data';
import { Collections } from './mock-data/collections';
import { Users } from './mock-data/users';
import { Events } from './mock-data/events';

const initialState = {
	collections: Collections,
	events: Events,
	currentUser: Users[Math.floor(Math.random())*Users.length].userName
};

export default createStore(tabletopMeetupReducer, initialState);