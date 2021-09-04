import {createStore, compose} from 'redux';
import {persistStateEnhancer} from './persistStateEnhancer';

const initialState = 'BAZ';
const mockReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FOO':
      return 'FOO';

    case 'BAR':
      return 'BAR';

    default:
      return state;
  }
};

const path = 'test';
/** @see src/withReduxFeatures.js */
const composedEnhancers = compose(persistStateEnhancer(path));

describe('persistStateEnhancer', () => {
  let store;

  beforeEach(() => {
    /** Set store same as we do at src/withReduxFeatures.js */
    store = createStore(mockReducer, undefined, composedEnhancers);
    /**
     * Clean localStorage
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
     */
    localStorage.removeItem(path);
  });

  it('records initial state to localStorage', () => {
    expect(localStorage.getItem(path)).toBe(null);
    store.dispatch({type: ''});
    /** Check value in localStorage */
    expect(localStorage.getItem(path)).toBe(JSON.stringify(initialState));
  });

  it('reads state from localStorage', () => {
    localStorage.setItem(path, JSON.stringify('BUZZ'));
    /** Create new store for this test to catch localStorage changes from above */
    store = createStore(mockReducer, undefined, composedEnhancers);
    store.dispatch({type: ''});
    expect(store.getState()).toBe('BUZZ');
  });

  it('records state changes to localStorage', () => {
    store.dispatch({type: 'FOO'});
    expect(localStorage.getItem(path)).toBe(JSON.stringify('FOO'));
    store.dispatch({type: 'BAR'});
    expect(localStorage.getItem(path)).toBe(JSON.stringify('BAR'));
  });
});
