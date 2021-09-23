/* eslint-disable linebreak-style */
import { combineReducers } from 'redux';

import ridesReducer from './ridesReducer';
import userReducer from './userReducer';
import timelineReducer from './timelineReducer';

const rootReducer = combineReducers({
  rides: ridesReducer,
  user: userReducer,
  timeline: timelineReducer,
});

export default rootReducer;
