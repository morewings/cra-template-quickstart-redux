import {combineReducers} from 'redux';
import SampleReducer from 'Redux/reducers/SampleReducer';

const rootReducer = combineReducers({
  sample: SampleReducer,
});

export default rootReducer;
