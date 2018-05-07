import { createStore } from 'redux';
import { tabletopMeetupReducer } from './reducers';

export default createStore(tabletopMeetupReducer);