import { createStore } from 'redux';
import { combineReducers } from 'redux-starter-kit';
import reducers from './reducers';

const reducer = combineReducers(reducers);
export type IState = ReturnType<typeof reducer>;

export default () => createStore(reducer);
