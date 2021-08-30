import React from 'react';
import {Provider} from 'react-redux';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import axios from 'axios';
import configureStore from 'redux-mock-store';
import {GET_RANDOM_NUMBER} from 'features/random/actionTypes';
import {store as realStore} from 'withReduxFeatures';
import {promiseResolverMiddleware} from '../../middlewares/promiseResolverMiddleware';
import Random from './Random';

/**
 * Create mock store
 * @see https://github.com/dmitry-zaets/redux-mock-store
 */
const mockStore = configureStore([promiseResolverMiddleware]);

jest.mock('axios');

/* We use these strings to match HTMLElements */
const pristineText = 'Click the button to get random number';
const loadingText = 'Getting number';
const errorText = 'Ups...';
const response = 6;

describe('components > Random', () => {
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

  it('handles successful request', async () => {
    /**
     * Mock axios successful response
     * @see https://www.robinwieruch.de/axios-jest
     */
    axios.get.mockImplementationOnce(() => Promise.resolve({data: response}));

    /**
     * `getByRole`:
     * @see https://testing-library.com/docs/dom-testing-library/api-queries#byrole
     */
    const {asFragment, getByRole} = render(<Random />, {
      wrapper: ({children}) => (
        /* We use real store here, to get action through */
        <Provider store={realStore}>{children}</Provider>
      ),
    });

    /**
     * Search for the button and make testing library click on it
     * @see https://testing-library.com/docs/react-testing-library/cheatsheet#events
     */
    fireEvent.click(getByRole('button'));

    /** Check that initial message has changed to loading. */
    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByText(pristineText)).not.toBeInTheDocument();
    expect(screen.queryByText(loadingText)).toBeInTheDocument();

    /** Check that loading message has changed to success. */
    await waitForElementToBeRemoved(() => screen.queryByText(loadingText));
    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByText(pristineText)).not.toBeInTheDocument();
    expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
    expect(screen.queryByText(response)).toBeInTheDocument();
  });

  it('handles rejected request', async () => {
    /**
     * Mock axios rejected response
     * @see https://www.robinwieruch.de/axios-jest
     */
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('')));

    /**
     * `getByRole`:
     * @see https://testing-library.com/docs/dom-testing-library/api-queries#byrole
     */
    const {asFragment, getByRole} = render(<Random />, {
      wrapper: ({children}) => (
        /* We use real store here, to get action through */
        <Provider store={realStore}>{children}</Provider>
      ),
    });

    /**
     * Search for the button and make testing library click on it
     * @see https://testing-library.com/docs/react-testing-library/cheatsheet#events
     */
    fireEvent.click(getByRole('button'));

    /** Check that initial message has changed to loading. */
    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByText(pristineText)).not.toBeInTheDocument();
    expect(screen.queryByText(loadingText)).toBeInTheDocument();

    /** Check that loading message has changed to error. */
    await waitForElementToBeRemoved(() => screen.queryByText(loadingText));
    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByText(pristineText)).not.toBeInTheDocument();
    expect(screen.queryByText(loadingText)).not.toBeInTheDocument();
    expect(screen.queryByText(errorText)).toBeInTheDocument();
  });

  it('dispatches an action sequence on successful request made', async () => {
    const store = mockStore({
      random: {
        isLoading: false,
        hasError: false,
        isFulfilled: false,
      },
    });

    /**
     * Mock axios successful response
     * @see https://www.robinwieruch.de/axios-jest
     */
    axios.get.mockImplementationOnce(() => Promise.resolve({data: response}));

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
    });

    /** Second dispatched action should deliver response from API */
    expect(store.getActions()[1].payload.data).toEqual(response);
  });

  it('dispatches an action sequence on rejected request made', async () => {
    const store = mockStore({
      random: {
        isLoading: false,
        hasError: false,
        isFulfilled: false,
      },
    });

    /**
     * Mock axios rejected response
     * @see https://www.robinwieruch.de/axios-jest
     */
    axios.get.mockImplementationOnce(() => Promise.reject(new Error('')));

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
        `${GET_RANDOM_NUMBER}_REJECTED`
      );
    });
  });
});
