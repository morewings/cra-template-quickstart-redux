import {GET_RANDOM_NUMBER} from './actionTypes';

const initialState = {
  number: undefined,
  isLoading: false,
  hasError: false,
  isFulfilled: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${GET_RANDOM_NUMBER}_PENDING`:
      return {
        ...state,
        isFulfilled: false,
        isLoading: true,
        hasError: false,
        number: undefined,
      };

    case `${GET_RANDOM_NUMBER}_FULFILLED`:
      return {
        isFulfilled: true,
        isLoading: false,
        hasError: false,
        number: action.payload.data,
      };

    case `${GET_RANDOM_NUMBER}_REJECTED`:
      return {
        isFulfilled: false,
        isLoading: false,
        hasError: true,
        number: undefined,
      };

    default:
      return state;
  }
};
