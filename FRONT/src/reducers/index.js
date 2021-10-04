/* eslint-disable linebreak-style */
import { combineReducers } from 'redux';

import ridesReducer from './ridesReducer';
import userReducer from './userReducer';
import signupReducer from './signupReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  rides: ridesReducer,
  user: userReducer,
  signup: signupReducer,
  profile: profileReducer,
});

export default rootReducer;
