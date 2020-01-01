import {SAMPLE} from 'Redux/constants/';

export function sample(payload) {
  return {
    type: SAMPLE,
    payload,
  };
}
