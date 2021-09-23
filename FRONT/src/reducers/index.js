import { combineReducers } from 'redux';

import ridesReducer from './ridesReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  rides: ridesReducer,
  user: userReducer,
});

export default rootReducer;
