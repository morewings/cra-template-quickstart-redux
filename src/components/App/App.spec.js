import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {render} from '@testing-library/react';
import App from './App';

describe('App', () => {
  const mockStore = configureStore([]);
  const store = mockStore({
    count: {
      value: 6,
    },
  });

  it('renders without crashing', () => {
    /**
     * `asFragment`:
     * @see https://testing-library.com/docs/react-testing-library/api#asfragment
     * `wrapper`
     * @see https://testing-library.com/docs/react-testing-library/api#wrapper
     */
    const {asFragment} = render(<App />, {
      wrapper: ({children}) => <Provider store={store}>{children}</Provider>,
    });

    /**
     * Basic snapshot test to make sure, that rendered component
     * matches expected footprint.
     */
    expect(asFragment()).toMatchSnapshot();
  });
});
