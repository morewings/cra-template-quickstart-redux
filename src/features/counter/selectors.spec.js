import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {renderHook} from '@testing-library/react-hooks';
import useCountValue from './selectors';

describe('features > counter > useCountValue', () => {
  /** Create mock store with the count value */
  const mockStore = configureStore([]);
  const value = 6;
  const store = mockStore({
    count: {
      value,
    },
  });

  it('returns count value', () => {
    /**
     * Render hook, using testing-library utility
     * @see https://react-hooks-testing-library.com/reference/api#renderhook
     */
    const {result} = renderHook(() => useCountValue(), {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toBe(value);
  });
});
