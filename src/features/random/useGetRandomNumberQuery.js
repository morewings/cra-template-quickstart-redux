import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import config from 'config';
import {GET_RANDOM_NUMBER} from './actionTypes';

const useGetRandomNumberQuery = () => {
  const dispatch = useDispatch();
  return useCallback(
    () =>
      dispatch({
        type: GET_RANDOM_NUMBER,
        payload: axios.get(config.randomAPI),
      }),
    [dispatch]
  );
};

export default useGetRandomNumberQuery;
