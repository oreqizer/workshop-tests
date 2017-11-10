/* @flow */
import 'rxjs';
import { combineEpics } from 'redux-observable';

import * as selectors from './';
import * as actions from './actions';
import * as api from './api';

const getTodosEpic = action$ =>
  action$
    .filter(action => action.type === actions.GET)
    .flatMap(() => (
      api
        .getTodos()
        .then(data => ({
          type: actions.GET_SUCCESS,
          payload: { data },
        }))
        .catch(error => ({
          type: actions.GET_ERROR,
          payload: { error },
        }))
    ));

const createTodoEpic = (action$, store) =>
  action$
    .filter(action => action.type === actions.CREATE)
    .do(() => console.log('Prev todos:', selectors.getTodos(store.getState())))
    .flatMap(action => (
      api
        .postTodo(action.payload.text)
        .then(id => ({
          type: actions.CREATE_SUCCESS,
          payload: { id, text: action.payload.text },
        }))
        .catch(error => ({
          type: actions.CREATE_ERROR,
          payload: { error },
        }))
    ));

const editTodoEpic = action$ =>
  action$
    .filter(action => action.type === actions.EDIT)
    .flatMap(action => (
      api
        .putTodo(action.payload.id, action.payload.text)
        .then(() => ({
          type: actions.EDIT_SUCCESS,
          payload: action.payload,
        }))
        .catch(error => ({
          type: actions.EDIT_ERROR,
          payload: { error },
        }))
    ));

const deleteTodoEpic = action$ =>
  action$
    .filter(action => action.type === actions.DELETE)
    .flatMap(action => (
      api
        .deleteTodo(action.payload.id)
        .then(() => ({
          type: actions.DELETE_SUCCESS,
          payload: { id: action.payload.id },
        }))
        .catch(error => ({
          type: actions.DELETE_ERROR,
          payload: { error },
        }))
    ));

export default combineEpics(
  getTodosEpic,
  createTodoEpic,
  editTodoEpic,
  deleteTodoEpic,
);
