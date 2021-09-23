/* eslint-disable linebreak-style */
import { combineReducers } from 'redux';

import ridesReducer from './ridesReducer';
import userReducer from './userReducer';
import signupReducer from './signupReducer';

const rootReducer = combineReducers({
  rides: ridesReducer,
  user: userReducer,
  signup: signupReducer,
});

export default rootReducer;
