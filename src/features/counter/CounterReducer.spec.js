import {INCREMENT_COUNTER} from './actionTypes';
import CounterReducer from './CounterReducer';

describe('features > counter > CounterReducer', () => {
  /**
   * All test cases are very simple, since Redux
   * reducers are pure functions
   */
  it('returns initial state, if non matched action is dispatched', () => {
    const initialState = {
      value: 0,
    };

    const action = {
      type: 'FOO',
    };

    expect(CounterReducer(initialState, action)).toBe(initialState);
  });

  it(`returns state with incremented value, if ${INCREMENT_COUNTER} action is dispatched`, () => {
    const initialState = {
      value: 0,
    };

    /** State we expect after action dispatched */
    const expectedState = {
      value: 1,
    };

    const action = {
      type: INCREMENT_COUNTER,
      value: expectedState.value,
    };
    /**
     * Use `toEqual` matcher instead of `toBe`,
     * since latter assumes object equality
     */
    expect(CounterReducer(initialState, action)).toEqual(expectedState);
  });
});
