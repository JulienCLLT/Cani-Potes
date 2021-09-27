/* eslint-disable linebreak-style */
import { createStore, compose, applyMiddleware } from 'redux';

import reducer from '../reducers';
import ridesMiddleware from '../middlewares/ridesMiddleware';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleWares = [ridesMiddleware];

const enhancers = composeEnhancers(
  applyMiddleware(...middleWares),
);

const store = createStore(reducer, enhancers);

export default store;
