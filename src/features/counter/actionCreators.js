import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import useCountValue from './selectors';
import {INCREMENT_COUNTER} from './actionTypes';

const useActions = () => {
  const dispatch = useDispatch();
  const count = useCountValue();
  const incrementCounter = useCallback(() => {
    dispatch({
      type: INCREMENT_COUNTER,
      value: count + 1,
    });
  }, [count, dispatch]);
  return {incrementCounter};
};

export default useActions;
