import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {INCREMENT_COUNTER} from './actionTypes';

const useActions = () => {
  const dispatch = useDispatch();
  const incrementCounter = useCallback(() => {
    dispatch({
      type: INCREMENT_COUNTER,
    });
  }, [dispatch]);
  return {incrementCounter};
};

export default useActions;
