import configureStore from 'redux-mock-store';
import {waitFor} from '@testing-library/react';
import {promiseResolverMiddleware} from './promiseResolverMiddleware';

const mockStore = configureStore([promiseResolverMiddleware]);

describe('promiseResolverMiddleware', () => {
  const store = mockStore({});

  afterEach(() => {
    /**
     * Flush calls of redux-mock-store.
     * @see https://github.com/reduxjs/redux-mock-store#api
     */
    store.clearActions();
  });

  it('passes through non-Promise actions', () => {
    const action = {
      type: 'FOO',
    };
    store.dispatch(action);
    expect(store.getActions()[0]).toBe(action);
  });

  it('dispatches _PENDING action when given Promise', () => {
    const action = {
      type: 'FOO',
      payload: Promise.resolve(),
    };
    store.dispatch(action);
    /**
     * _PENDING action should run immediately, no need for async here.
     */
    expect(store.getActions()[0]).toEqual({type: `${action.type}_PENDING`});
  });

  it('handles successful response', async () => {
    const response = 'foo';
    const action = {
      type: 'FOO',
      payload: Promise.resolve(response),
    };
    store.dispatch(action);
    /**
     * Use waitFor here to wait until Promise resolved.
     * @see https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
     */
    await waitFor(() =>
      expect(store.getActions()[1]).toEqual({
        type: `${action.type}_FULFILLED`,
        payload: response,
      })
    );
  });

  it('handles rejection', async () => {
    const action = {
      type: 'FOO',
      payload: Promise.reject(),
    };
    store.dispatch(action);
    /**
     * Use waitFor here to wait until Promise rejected.
     * @see https://testing-library.com/docs/dom-testing-library/api-async/#waitfor
     */
    await waitFor(() =>
      expect(store.getActions()[1]).toEqual({
        type: `${action.type}_REJECTED`,
      })
    );
  });
});
