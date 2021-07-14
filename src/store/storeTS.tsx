import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const reducer = require('./rootReducer');

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export type AppDispatch = typeof store.dispatch;

export default store;
