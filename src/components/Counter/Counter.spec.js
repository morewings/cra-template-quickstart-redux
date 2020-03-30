import React from 'react';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {INCREMENT_COUNTER} from 'features/counter/actionTypes';
import Counter from './Counter';

describe('components > Counter', () => {
  /** Create mock store with the count value */
  const mockStore = configureStore([]);
  const store = mockStore({
    count: {
      value: 6,
    },
  });

  /**
   * Add spy to watch for store.dispatch method.
   * @see https://jestjs.io/docs/en/jest-object#jestspyonobject-methodname
   */
  jest.spyOn(store, 'dispatch');

  /**
   * Jest hook which runs before each test,
   * @see https://jestjs.io/docs/en/api#beforeeachfn-timeout
   */
  beforeEach(() => {
    /**
     * Clear any saved mock data from previous tests,
     * because jest saves calls data for spies and mocks.
     * @see https://jestjs.io/docs/en/mock-function-api#mockfnmockclear
     */
    store.dispatch.mockClear();
  });

  it('renders without crashing', () => {
    /**
     * `asFragment`:
     * @see https://testing-library.com/docs/react-testing-library/api#asfragment
     * `qetByText`:
     * @see https://testing-library.com/docs/dom-testing-library/api-queries#bytext
     * `wrapper`
     * @see https://testing-library.com/docs/react-testing-library/api#wrapper
     */
    const {asFragment, getByText} = render(<Counter />, {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    /**
     * Basic snapshot test to make sure, that rendered component
     * matches expected footprint.
     */
    expect(asFragment()).toMatchSnapshot();

    /** More precise test for counter value */
    expect(getByText(/6/i).textContent).toBe('6'); // 6 is value we expect, we need to convert Number to String, because HTMLElement textContent method returns string value
  });

  it('dispatches an action on button click', () => {
    /**
     * `getByRole`:
     * @see https://testing-library.com/docs/dom-testing-library/api-queries#byrole
     */
    const {getByRole} = render(<Counter />, {
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
      type: INCREMENT_COUNTER,
      value: 7,
    });
  });
});
