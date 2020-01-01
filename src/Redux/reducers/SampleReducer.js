import {SAMPLE} from 'Redux/constants';

const initialState = {
  increment: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SAMPLE: {
      return {...state, increment: state.increment + 1};
    }
    default: {
      return state;
    }
  }
}
