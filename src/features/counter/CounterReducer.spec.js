import {INCREMENT_COUNTER} from './actionTypes';
import CounterReducer from './CounterReducer';

describe('features > counter > CounterReducer', () => {
  /* All test cases are very simple, since Redux reducers are pure functions */
  it('returns initial state, if non matched action is provided', () => {
    const initialState = {
      value: 0,
    };

    const action = {
      type: 'FOO',
    };

    expect(CounterReducer(initialState, action)).toBe(initialState);
  });
  it(`increments value, if ${INCREMENT_COUNTER} action is provided`, () => {
    const initialState = {
      value: 0,
    };

    /* State we expect after action dispatched */
    const expectedState = {
      value: 1,
    };

    const action = {
      type: INCREMENT_COUNTER,
    };

    expect(CounterReducer(initialState, action)).toEqual(expectedState); // use `toEqual` matcher instead of `toBe`, since latter assumes object equality
  });
});
