import {CHANGE_COUNTER} from './actionTypes';

const initialState = {
  value: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COUNTER: {
      return {...state, value: action.payload};
    }
    default: {
      return state;
    }
  }
};
