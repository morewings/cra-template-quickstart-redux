import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {persistStateEnhancer} from './enhancers/persistStateEnhancer';
import {promiseResolverMiddleware} from './middlewares/promiseResolverMiddleware';
import {CounterReducer} from './features/counter';
import {RandomReducer} from './features/random';
import withProvider from './withProvider';

/**
 * Create root reducer, containing
 * all features of the application
 */
const rootReducer = combineReducers({
  count: CounterReducer,
  random: RandomReducer,
});

/**
 * Use Redux Dev Tools, if they are installed in browser, otherwise compose from Redux
 */
/* eslint-disable-next-line no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/** Compose middlewares into enhancer. You can list multiple middlewares here as arguments to applyMiddleware. */
const middlewareEnhancer = applyMiddleware(promiseResolverMiddleware);

/**
 * Compose multiple store enhancers into one.
 * @see https://redux.js.org/api/createstore
 */
const composedEnhancers = composeEnhancers(
  /** Note that middlewareEnhancer is included here. */
  middlewareEnhancer,
  /** It's possible to configure enhancer by providing arguments. */
  persistStateEnhancer('reduxExample')
);

/**
 * Create Redux store using above artifacts.
 * @see https://redux.js.org/api/createstore
 */
export const store = createStore(rootReducer, undefined, composedEnhancers);

/**
 * Create HOC, which wraps given Component with Redux Provider
 */
export default withProvider({store, Provider});
