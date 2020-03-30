import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {GET_RANDOM_NUMBER} from './actionTypes';

const useActions = () => {
  const dispatch = useDispatch();
  const getNumber = useCallback(() => {
    dispatch({
      type: GET_RANDOM_NUMBER,
      payload: axios.get(
        'https://www.random.org/integers/?num=1&min=1&max=99&col=1&base=10&format=plain&rnd=new'
      ),
    });
  }, [dispatch]);
  return {getNumber};
};

export default useActions;
