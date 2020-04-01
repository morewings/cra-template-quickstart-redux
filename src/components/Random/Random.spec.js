import React from 'react';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {GET_RANDOM_NUMBER} from '../../features/random/actionTypes';
import Random from './Random';

describe('components > Random', () => {
  /** 
  * Create mock store
  * @see https://github.com/dmitry-zaets/redux-mock-store
  */
  const mockStore = configureStore([]);

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
    it(`it renders when isLoading === ${isLoading} && hasError === ${hasError} && isFulfilled === ${isFulfilled}`, () => {
      /** Create store mock, using values from table */
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
       * `qetByText`:
       * @see https://testing-library.com/docs/dom-testing-library/api-queries#bytext
       * `wrapper`
       * @see https://testing-library.com/docs/react-testing-library/api#wrapper
       */
      const {asFragment} = render(<Random />, {
        wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
      });

      /**
       * Basic snapshot test to make sure, that rendered component
       * matches expected footprint.
       */
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it('dispatches an action on button click', () => {
    const store = mockStore({
      random: {
        isLoading: false,
        hasError: false,
        isFulfilled: false,
      },
    });

    /**
     * Add spy to watch for store.dispatch method.
     * @see https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname
     */
    jest.spyOn(store, 'dispatch');

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

    /** Check if store.dispatch method was run */
    expect(store.dispatch).toHaveBeenCalledTimes(1);

    /** Check if store.dispatch was run with correct action */
    expect(store.dispatch).toHaveBeenCalledWith({
      type: GET_RANDOM_NUMBER,
      payload: expect.any(Promise),
    });

    /**
     * Clear any saved mock data from previous tests,
     * because jest saves calls data for spies and mocks.
     * @see https://jestjs.io/docs/en/mock-function-api#mockfnmockclear
     */
    store.dispatch.mockClear();
  });
});
