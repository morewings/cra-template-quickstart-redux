import {INCREMENT_COUNTER} from './actionTypes';

const initialState = {
  value: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {...state, value: action.value};

    default:
      return state;
  }
};
