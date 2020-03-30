import {GET_RANDOM_NUMBER} from './actionTypes';
import RandomReducer from './RandomReducer';

describe('features > random > RandomReducer', () => {
  it('returns initial state, if non matched action is dispatched', () => {
    const initialState = {
      isLoading: false,
      hasError: false,
      isFulfilled: false,
    };

    const action = {
      type: 'FOO',
    };

    expect(RandomReducer(initialState, action)).toBe(initialState);
  });

  /**
   * Provide table of values to run test case against
   * @see https://jestjs.io/docs/en/api#testeachtablename-fn-timeout
   */
  it.each([
    [`${GET_RANDOM_NUMBER}_FULFILLED`],
    [`${GET_RANDOM_NUMBER}_PENDING`],
    [`${GET_RANDOM_NUMBER}_REJECTED`],
  ])(`updates state according to dispatched action`, actionType => {
    const initialState = {
      value: 0,
    };

    const payload =
      actionType === `${GET_RANDOM_NUMBER}_FULFILLED`
        ? {
            data: 1,
          }
        : undefined;

    const action = {
      type: actionType,
      payload,
    };

    expect(RandomReducer(initialState, action)).toMatchSnapshot();
  });
});
