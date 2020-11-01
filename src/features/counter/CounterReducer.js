import {INCREMENT_COUNTER} from './actionTypes';

const initialState = {
  value: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return {...state, value: action.value};

    default:
      return state;
  }
};

export default reducer;
