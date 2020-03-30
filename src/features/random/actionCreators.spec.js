import React from 'react';
import {Provider} from 'react-redux';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import promise from 'redux-promise-middleware';
import {renderHook} from '@testing-library/react-hooks';
import config from '../../config';
import {GET_RANDOM_NUMBER} from './actionTypes';
import useActions from './actionCreators';

describe('features > counter > useActions', () => {
  /** Create mock store with middlewares */
  const mockStore = configureStore([promise]);

  const store = mockStore({
    random: {
      isLoading: false,
      hasError: false,
      isFulfilled: false,
    },
  });

  it('returns function', () => {
    /**
     * Render hook, using testing-library utility
     * @see https://react-hooks-testing-library.com/reference/api#renderhook
     */
    const {result} = renderHook(() => useActions(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current.getNumber).toBeInstanceOf(Function);
  });

  describe('getNumber', () => {
    /**
     * Initialize axios mock adapter to mock API responses
     * @see https://github.com/ctimmerm/axios-mock-adapter
     */
    const mockAxios = new MockAdapter(axios);

    /**
     * Mock network error response
     */
    const mockNetworkError = () => {
      mockAxios.onGet(config.randomAPI).networkError();
    };

    /**
     * Mock 404 response
     */
    const mock404 = () => {
      mockAxios.onGet(config.randomAPI).reply(404);
    };

    /**
     * Mock network timeout
     */
    const mockTimeout = () => {
      mockAxios.onGet(config.randomAPI).timeout();
    };

    afterEach(() => {
      mockAxios.resetHandlers();
      store.clearActions();
    });

    /** Note that tests functions are async */
    it(`it handles successful API query`, async () => {
      const {result} = renderHook(() => useActions(), {
        wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
      });

      /** Mock response from API */
      const response = 6;

      mockAxios.onGet(config.randomAPI).reply(200, response);

      /**
       * Wait until async action finishes
       */
      await result.current.getNumber();

      /** First dispatched action should have _PENDING suffix */
      expect(store.getActions()[0]).toEqual({
        type: `${GET_RANDOM_NUMBER}_PENDING`,
      });

      /** Second dispatched action should have _FULFILLED suffix */
      expect(store.getActions()[1].type).toEqual(
        `${GET_RANDOM_NUMBER}_FULFILLED`
      );

      /** Second dispatched action should deliver response from API */
      expect(store.getActions()[1].payload.data).toEqual(response);
    });

    /** Iterate through different API error cases */
    it.each([[mockNetworkError], [mock404], [mockTimeout]])(
      `it handles API fetching errors`,
      async mockResponse => {
        let hasThrown;
        const {result} = renderHook(() => useActions(), {
          wrapper: ({children}) => (
            <Provider store={store}>{children}</Provider>
          ),
        });

        mockResponse();

        /**
         * Use try/catch block, because await function will throw an error when request fails
         */
        try {
          await result.current.getNumber();
        } catch {
          hasThrown = true; // eslint-disable-line fp/no-mutation
        } finally {
          expect(store.getActions()[0]).toEqual({
            type: `${GET_RANDOM_NUMBER}_PENDING`,
          });
          expect(store.getActions()[1].type).toEqual(
            `${GET_RANDOM_NUMBER}_REJECTED`
          );
          expect(store.getActions()[1].payload).toBeInstanceOf(Error);
          expect(store.getActions()[1].payload).toMatchSnapshot();
          expect(hasThrown).toBe(true);
        }
      }
    );
  });
});
