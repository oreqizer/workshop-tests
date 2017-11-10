/* @flow */
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import gibStore from "redux-mock-store";

import WrappedTodoContainer from '../';

import log from "../services/log";

jest.mock('../services/log');

const TodoContainer = WrappedTodoContainer.WrappedComponent;

const todos = [{
  id: '1234',
  text: 'kek',
  complete: true,
}, {
  id: '12345',
  text: 'bur',
  complete: false,
}];

const mockStore = gibStore([]);

describe('#Todo/index', () => {
  test("mounting", () => {
    const getTodos = jest.fn();
    const wrapper = mount(
      <TodoContainer
        todos={todos}
        count={todos.length}
        getTodos={getTodos}
        createTodo={jest.fn()}
        deleteTodo={jest.fn()}
      />
    );

    expect(getTodos).toBeCalled();
  });

  test("handle text change", () => {
    const wrapper = shallow(
      <TodoContainer
        todos={todos}
        count={todos.length}
        getTodos={jest.fn()}
        createTodo={jest.fn()}
        deleteTodo={jest.fn()}
      />
    );

    expect(wrapper.state("text")).toBe("");

    const node = wrapper.instance();
    node.handleTextChange({ target: { value: "bur" } });

    expect(wrapper.state("text")).toBe("bur");
  });

  test("handle add", () => {
    const wrapper = shallow(
      <TodoContainer
        todos={todos}
        count={todos.length}
        getTodos={jest.fn()}
        createTodo={jest.fn()}
        deleteTodo={jest.fn()}
      />
    );

    const node = wrapper.instance();
    node.handleAdd();

    expect(log).toBeCalledWith("Added new todo with text", "");
  });

  test("handle add using DI", () => {
    const logMock = jest.fn();
    const wrapper = shallow(
      <TodoContainer
        todos={todos}
        count={todos.length}
        getTodos={jest.fn()}
        createTodo={jest.fn()}
        deleteTodo={jest.fn()}
        log={logMock}
      />
    );

    const node = wrapper.instance();
    node.handleAdd();

    expect(logMock).toBeCalledWith("Added new todo with text", "");
  });

  test("handle text key", () => {
    const wrapper = shallow(
      <TodoContainer
        todos={todos}
        count={todos.length}
        getTodos={jest.fn()}
        createTodo={jest.fn()}
        deleteTodo={jest.fn()}
        log={jest.fn()}
      />
    );

    const handleAdd = jest.fn();
    const node = wrapper.instance();

    // $FlowExpected
    node.handleAdd = handleAdd;

    node.handleTextKey({ key: "Enter" });

    expect(handleAdd).toBeCalled();
  });

  test("connect", () => {
    const store = mockStore({
      todos: {
        loading: false,
        todos: [],
      },
    });

    const wrapper = shallow(
      <WrappedTodoContainer store={store} />
    );

    // toBe -> ===
    expect(wrapper.prop("todos")).toEqual([]);
  })
});
