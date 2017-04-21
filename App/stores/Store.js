/**
 * Created by liuxi on 2017/2/14.
 */
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import rootReducer from '../reducers';

export default store = createStore(
    rootReducer,
    applyMiddleware(thunk, promiseMiddleware)
);