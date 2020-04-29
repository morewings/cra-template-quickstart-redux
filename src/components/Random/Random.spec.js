import React from 'react';
import {Provider} from 'react-redux';
import {render, fireEvent, waitFor} from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import promise from 'redux-promise-middleware';
import configureStore from 'redux-mock-store';
import {GET_RANDOM_NUMBER} from '../../features/random/actionTypes';
import Random from './Random';
import config from '../../config';

describe('components > Random', () => {
  /**
   * Create mock store
   * @see https://github.com/dmitry-zaets/redux-mock-store
   */
  const mockStore = configureStore([promise]);

  /**
   * Initialize axios mock adapter to mock API responses
   * @see https://github.com/ctimmerm/axios-mock-adapter
   */
  const mockAxios = new MockAdapter(axios);

  beforeEach(() => {
    mockAxios.resetHandlers();
  });

  /**
   * Provide table of values to run tests with
   * @see https://jestjs.io/docs/en/api#describeeachtablename-fn-timeout
   */
  describe.each`
    isLoading | hasError | isFulfilled
    ${false}  | ${false} | ${false}
    ${true}   | ${false} | ${false}
    ${false}  | ${true}  | ${false}
    ${false}  | ${false} | ${true}
  `('renders different store states', ({isLoading, hasError, isFulfilled}) => {
    it(`when isLoading === ${isLoading} && hasError === ${hasError} && isFulfilled === ${isFulfilled}`, () => {
      const store = mockStore({
        random: {
          isLoading,
          hasError,
          isFulfilled,
          number: isFulfilled ? 1 : undefined,
        },
      });

      /**
       * `asFragment`:
       * @see https://testing-library.com/docs/react-testing-library/api#asfragment
       * `wrapper`:
       * @see https://testing-library.com/docs/react-testing-library/api#wrapper
       */
      const {asFragment} = render(<Random />, {
        wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
      });

      /**
       * Basic snapshot test to check, if rendered component
       * matches expected footprint.
       */
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('dispatches an action sequence on button click', async () => {
    const store = mockStore({
      random: {
        isLoading: false,
        hasError: false,
        isFulfilled: false,
      },
    });

    /** Mock response from API */
    const response = 6;
    mockAxios.onGet(config.randomAPI).reply(200, response);

    /**
     * `getByRole`:
     * @see https://testing-library.com/docs/dom-testing-library/api-queries#byrole
     */
    const {getByRole} = render(<Random />, {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    /**
     * Search for the button and make testing library click on it
     * @see https://testing-library.com/docs/react-testing-library/cheatsheet#events
     */
    fireEvent.click(getByRole('button'));

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
});
