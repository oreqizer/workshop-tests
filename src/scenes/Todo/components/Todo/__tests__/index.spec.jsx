/* @flow */
import * as React from 'react';
import { shallow } from 'enzyme';

import Todo from '../';

const todo = {
  text: 'kek',
};

describe('#Todo/index', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <Todo
        todo={todo}
        onDelete={jest.fn()}
      />,
    );

    expect(wrapper.getElement()).toMatchSnapshot();
  });
});
