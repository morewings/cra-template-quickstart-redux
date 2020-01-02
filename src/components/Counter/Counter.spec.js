import React from 'react';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import store from '../../store';
import Counter from './Counter';

describe('src > components > Counter', () => {
  it('renders without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Counter />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
