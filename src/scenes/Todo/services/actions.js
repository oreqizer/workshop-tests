/* @flow */
export type Action = Object; // TODO proper

export const GET = 'todos/GET';
export const GET_SUCCESS = 'todos/GET_SUCCESS';
export const GET_ERROR = 'todos/GET_ERROR';
export const CREATE = 'todos/CREATE';
export const CREATE_SUCCESS = 'todos/CREATE_SUCCESS';
export const CREATE_ERROR = 'todos/CREATE_ERROR';
export const EDIT = 'todos/EDIT';
export const EDIT_SUCCESS = 'todos/EDIT_SUCCESS';
export const EDIT_ERROR = 'todos/EDIT_ERROR';
export const DELETE = 'todos/DELETE';
export const DELETE_SUCCESS = 'todos/DELETE_SUCCESS';
export const DELETE_ERROR = 'todos/DELETE_ERROR';

export const getTodos = () => ({
  type: GET,
});

export const createTodo = (text: string) => ({
  type: CREATE,
  payload: { text },
});

export const editTodo = (id: string, text: string) => ({
  type: EDIT,
  payload: { id, text },
});

export const deleteTodo = (id: string) => ({
  type: DELETE,
  payload: { id },
});
