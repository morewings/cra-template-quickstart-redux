import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {renderHook} from '@testing-library/react-hooks';
import {useRandomNumber, useLoadingState} from './selectors';

describe('features > counter > useRandomNumber', () => {
  const mockStore = configureStore([]);

  const state = {
    random: {
      number: 42,
    },
  };

  const store = mockStore(state);

  it('returns count value', () => {
    /**
     * Render hook, using testing-library utility
     * @see https://react-hooks-testing-library.com/reference/api#renderhook
     */
    const {result} = renderHook(() => useRandomNumber(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toBe(state.random.number);
  });
});

describe('features > counter > useLoadingState', () => {
  const mockStore = configureStore([]);

  const state = {
    random: {
      isLoading: true,
      hasError: true,
      isFulfilled: true,
      foo: 'bar',
    },
  };

  const store = mockStore(state);

  it('returns count value', () => {
    /**
     * Render hook, using testing-library utility
     * @see https://react-hooks-testing-library.com/reference/api#renderhook
     */
    const {result} = renderHook(() => useLoadingState(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    /* We expect hook to return certain values from the state, but not all state */
    expect(result.current).not.toBe(state.random);
    expect(state.random).toMatchObject(result.current);
  });
});
