import React from 'react';
import {mount} from 'enzyme';
import {Provider} from 'react-redux';
import store from 'store';
import App from 'App';

it('renders without crashing', () => {
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
