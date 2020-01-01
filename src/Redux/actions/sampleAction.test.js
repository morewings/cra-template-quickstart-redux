import {SAMPLE} from 'Redux/constants/';
import {sample} from 'Redux/actions/sampleAction';

describe('Redux > actions > sampleAction', () => {
  it('returns and action', () => {
    const payload = 'payload';
    expect(sample(payload)).toEqual({
      type: SAMPLE,
      payload,
    });
  });
});
