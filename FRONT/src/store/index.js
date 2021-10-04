/* eslint-disable linebreak-style */
import { createStore, compose, applyMiddleware } from 'redux';

import reducer from '../reducers';
import ridesMiddleware from '../middlewares/ridesMiddleware';
import signupMiddleware from '../middlewares/signupMiddleware';
import signinMiddleware from '../middlewares/signInMiddleware';
import userMiddleware from '../middlewares/userMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleWares = [ridesMiddleware, signupMiddleware, signinMiddleware, userMiddleware];

const enhancers = composeEnhancers(
  applyMiddleware(...middleWares),
);

const store = createStore(reducer, enhancers);

export default store;
