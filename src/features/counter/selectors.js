import {useSelector} from 'react-redux';

const useCountValue = () => useSelector(state => state.count.value);

export default useCountValue;
