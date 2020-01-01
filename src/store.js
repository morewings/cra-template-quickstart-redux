import {combineReducers, createStore} from 'redux';
import {CounterReducer} from './Redux/counter';

const rootReducer = combineReducers({
  count: CounterReducer,
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
);

export default store;
