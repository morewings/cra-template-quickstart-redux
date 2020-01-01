import React from 'react';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {Provider} from 'react-redux';
import store from 'store';
import App from 'App';

it('renders without crashing', () => {
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});
