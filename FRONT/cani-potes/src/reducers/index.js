import { combineReducers } from 'redux';

import ridesReducer from './ridesReducer';

const rootReducer = combineReducers({
    rides: ridesReducer,
});

export default rootReducer;