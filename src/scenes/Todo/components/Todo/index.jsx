/* @flow */
import React from 'react';
import styled from 'styled-components';

import type { Todo } from '../../../../data/Todo';

const Container = styled.div`
  border: 1px solid white;
  height: 100px;
  width: 200px;
  margin: 5px;
  color: white;
`;

const Button = styled.div`
  background: red;
`;

type Props = {
  todo: Todo,
  onDelete: (id: string) => any,
}

class TodoComponent extends React.PureComponent<Props> {
  props: Props;

  handleDelete() {
    const { todo, onDelete } = this.props;

    onDelete(todo.id);
  }

  render() {
    const { props } = this;

    return (
      <Container>
        <span>
          {props.todo.text}
        </span>
        <Button onClick={() => this.handleDelete()}>
          DELETE
        </Button>
      </Container>
    );
  }
}

export default TodoComponent;
