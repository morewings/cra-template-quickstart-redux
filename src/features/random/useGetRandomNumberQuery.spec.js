import React from 'react';
import {Provider} from 'react-redux';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import {waitFor} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import {promiseResolverMiddleware} from '../../middlewares/promiseResolverMiddleware';
import {GET_RANDOM_NUMBER} from './actionTypes';
import useGetRandomNumberQuery from './useGetRandomNumberQuery';

jest.mock('axios');

describe('features > counter > useGetRandomNumberQuery', () => {
  /** Create mock store with middlewares */
  const mockStore = configureStore([promiseResolverMiddleware]);

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
    const {result} = renderHook(() => useGetRandomNumberQuery(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toBeInstanceOf(Function);
  });

  describe('gets number', () => {
    afterEach(() => {
      store.clearActions();
    });

    /** Note that tests functions are async */
    it(`handles successful API query`, async () => {
      const {result} = renderHook(() => useGetRandomNumberQuery(), {
        wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
      });

      /** Mock response from API */
      const response = 6;

      /**
       * Mock axios successful response
       * @see https://www.robinwieruch.de/axios-jest
       */
      axios.get.mockImplementationOnce(() => Promise.resolve({data: response}));

      /**
       * Wait until async action finishes
       */
      await result.current();

      /** First dispatched action should have _PENDING suffix */
      expect(store.getActions()[0]).toEqual({
        type: `${GET_RANDOM_NUMBER}_PENDING`,
      });

      await waitFor(() => {
        /** Second dispatched action should have _FULFILLED suffix */
        expect(store.getActions()[1].type).toEqual(
          `${GET_RANDOM_NUMBER}_FULFILLED`
        );
        /** Second dispatched action should deliver response from API */
        expect(store.getActions()[1].payload.data).toEqual(response);
      });
    });

    it(`handles rejected API query`, async () => {
      const {result} = renderHook(() => useGetRandomNumberQuery(), {
        wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
      });

      /**
       * Mock axios rejected response
       * @see https://www.robinwieruch.de/axios-jest
       */
      axios.get.mockImplementationOnce(() => Promise.reject(new Error('')));

      /**
       * Wait until async action finishes
       */
      await result.current();

      /** First dispatched action should have _PENDING suffix */
      expect(store.getActions()[0]).toEqual({
        type: `${GET_RANDOM_NUMBER}_PENDING`,
      });

      await waitFor(() => {
        /** Second dispatched action should have _REJECTED suffix */
        expect(store.getActions()[1].type).toEqual(
          `${GET_RANDOM_NUMBER}_REJECTED`
        );
      });
    });
  });
});
