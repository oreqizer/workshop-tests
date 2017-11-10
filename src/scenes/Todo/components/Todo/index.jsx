/* @flow */
import * as React from 'react';
import styled from 'styled-components';

import type { Todo } from '../../../../data/Todo';

const Container = styled.div`
  border: 1px solid white;
  height: 65px;
  width: 200px;
  margin: 5px;
  color: white;
`;

const Button = styled.div`
  background: red;
  
  &:hover {
    cursor: pointer;
  }
`;

const Complete = styled.div`
  height: 25px;
  line-height: 25px;
  font-weight: bold;
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
    const { todo } = this.props;

    return (
      <Container>
        <span>
          {todo.text}
        </span>
        <Button onClick={() => this.handleDelete()}>
          DELETE
        </Button>
        <Complete>
          {todo.complete ? 'complete' : 'not complete'}
        </Complete>
      </Container>
    );
  }
}

export default TodoComponent;
