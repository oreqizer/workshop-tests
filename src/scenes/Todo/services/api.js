/* @flow */
import type { Todo } from '../../../data/Todo';

export function getTodos(): Promise<Todo[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{
      id: '1234',
      text: 'kek',
      complete: false,
    }, {
      id: '12345',
      text: 'bur',
      complete: true,
    }]), 250);
  });
}

export function postTodo(text: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(String(Math.floor(Math.random() * 10000000))), 250);
  });
}

export function putTodo(text: string, id: string): Promise<*> {
  return new Promise((resolve) => {
    setTimeout(resolve, 250);
  });
}

export function deleteTodo(id: string): Promise<*> {
  return new Promise((resolve) => {
    setTimeout(resolve, 250);
  });
}
