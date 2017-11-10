/* @flow */
import * as React from 'react';
import { shallow, mount } from 'enzyme';

import Todo from '../';

const todo = {
  id: '1234',
  text: 'kek',
  complete: false,
};

const todoComplete = {
  id: '1234',
  text: 'kek',
  complete: true,
};

describe('#Todo/index', () => {
  test("snapshot not complete", () => {
    const wrapper = mount(
      <Todo
        todo={todo}
        onDelete={jest.fn()}
      />
    );

    expect(wrapper.getElement()).toMatchSnapshot();
  });

  test("snapshot complete", () => {
    const wrapper = shallow(
      <Todo
        todo={todoComplete}
        onDelete={jest.fn()}
      />
    );

    expect(wrapper.getElement()).toMatchSnapshot();
  });

  test("button onclick", () => {
    const onDelete = jest.fn();
    const wrapper = shallow(
      <Todo
        todo={todo}
        onDelete={onDelete}
      />
    );

    const btn = wrapper.find("[data-test='btn']");

    btn.simulate("click");

    expect(onDelete).toBeCalledWith(todo.id);
  });

  test("instance callback", () => {
    const onDelete = jest.fn();
    const wrapper = shallow(
      <Todo
        todo={todo}
        onDelete={onDelete}
      />
    );

    const node = wrapper.instance();

    node.handleDelete();

    expect(onDelete).toBeCalledWith(todo.id);
  });
});
