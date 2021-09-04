/**
 * Naive implementation of persistent store using localStorage. With optional path configuration.
 */
export const persistStateEnhancer =
  (path = 'reduxExample') =>
  next =>
  (reducer, initialState, enhancer) => {
    /**
     * Read saved state value from localStorage.
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
     */
    const localState = JSON.parse(localStorage.getItem(path));

    /** Use initial state defined in src/withReduxFeatures.js if no saved state found */
    const state = localState || initialState;

    /** Create store using next function */
    const store = next(reducer, state, enhancer);

    store.subscribe(() => {
      const nextState = store.getState();
      /**
       * Record state value to localStorage.
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
       */
      localStorage.setItem(path, JSON.stringify(nextState));
    });

    /** Pass the store to next enhancer */
    return store;
  };
