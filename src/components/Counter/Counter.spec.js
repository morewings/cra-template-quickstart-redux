import React from 'react';
import {Provider} from 'react-redux';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import store from 'store';
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
    const wrapper = shallow(
      <Provider store={store}>
        <Counter {...defaultProps} />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
