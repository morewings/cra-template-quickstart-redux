import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Counter from './Counter';

const sample = jest.fn();
const defaultProps = {
  increment: 0,
  sample,
};

describe('src > components > Sample.js', () => {
  beforeEach(() => {
    sample.mockClear();
  });
  it('renders without crashing', () => {
    const wrapper = shallow(<Counter {...defaultProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
