import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import config from '../../config';
import {GET_RANDOM_NUMBER} from './actionTypes';

const useActions = () => {
  const dispatch = useDispatch();
  const getNumber = useCallback(
    () =>
      dispatch({
        type: GET_RANDOM_NUMBER,
        payload: axios.get(config.randomAPI),
      }),
    [dispatch]
  );
  return {getNumber};
};

export default useActions;
