import React from 'react';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {CounterReducer} from './features/counter';

/**
 * Create root reducer, containing
 * all features of the application
 */
const rootReducer = combineReducers({
  count: CounterReducer,
});

/**
 * Initialize Redux Dev Tools,
 * if they are installed in browser.
 */
/* eslint-disable no-underscore-dangle */
const reduxDevtoolsEnhancer =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
/* eslint-enable */

/** Create Redux store with required boilerplate */
export const store = createStore(rootReducer, reduxDevtoolsEnhancer);

/**
 * Higher Order Component which takes another
 * Component and wraps it with Redux store
 */
const withReduxProvider = WrappedComponent => props => (
  <Provider store={store}>
    <WrappedComponent {...props} />
  </Provider>
);

export default withReduxProvider;
