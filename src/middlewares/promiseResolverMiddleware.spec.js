import configureStore from 'redux-mock-store';
import {promiseResolverMiddleware} from './promiseResolverMiddleware';

const mockStore = configureStore([promiseResolverMiddleware]);

describe('promiseResolverMiddleware', () => {
  it('renders', () => {
    const store = mockStore({
      random: {
        isLoading: false,
        hasError: false,
        isFulfilled: false,
      },
    });
  });
});
