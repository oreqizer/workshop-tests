/* @flow */
import * as React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import TodoComponent from './components/Todo';
import type { Todo } from '../../data/Todo';
import * as selectors from './services';
import * as actions from './services/actions';
import log from './services/log';

const Container = styled.div`
  width: 100%;
  height: 500px;
  color: white;
`;

const Count = styled.h1`
  color: white;
`;

const Input = styled.input`
  border: 1px solid lime;
`;

const AddButton = styled.button`
  background: lime;
`;

type Props = {
  count: number, // selector
  todos: Todo[], // selector
  getTodos: typeof actions.getTodos,
  createTodo: typeof actions.createTodo,
  deleteTodo: typeof actions.deleteTodo,
  // DI
  log: typeof log,
}

type State = {
  text: string,
}

class TodoContainer extends React.Component<Props, State> {
  static defaultProps = {
    log,
  };

  constructor(props: Props) {
    super(props);

    this.state = { text: '' };
  }

  componentDidMount() {
    this.props.getTodos();
  }

  handleTextChange(ev) {
    this.setState({ text: ev.target.value });
  }

  handleTextKey(ev) {
    if (ev.key === 'Enter') {
      this.handleAdd();
    } else {
      // NOT COVERED
    }
  }

  handleAdd() {
    const { log, createTodo } = this.props;
    const { text } = this.state;

    log('Added new todo with text', text);
    createTodo(text);
    this.setState({ text: '' });
  }

  render() {
    const { count, todos, deleteTodo } = this.props;

    return (
      <Container>
        <Count>
          {count} Todos
        </Count>
        <Input
          id="todo"
          value={this.state.text}
          onKeyDown={ev => this.handleTextKey(ev)}
          onChange={ev => this.handleTextChange(ev)}
          type="text"
        />
        <AddButton onClick={() => this.handleAdd()}>
          ADD
        </AddButton>
        {todos.map(todo => (
          <TodoComponent
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
          />
        ))}
      </Container>
    );
  }
}

export default connect(state => ({
  count: selectors.getTodosCount(state),
  todos: selectors.getTodos(state),
}), {
  getTodos: actions.getTodos,
  createTodo: actions.createTodo,
  deleteTodo: actions.deleteTodo,
})(TodoContainer);
