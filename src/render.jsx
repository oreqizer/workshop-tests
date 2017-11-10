import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import './render.css';
import Root from './scenes/Root';
import todosReducer from './scenes/Todo/services';
import todosEpic from './scenes/Todo/services/epics';
import registerServiceWorker from './browser/registerServiceWorker';

const epic = combineEpics(todosEpic);

const epicMw = createEpicMiddleware(epic);

const store = createStore(combineReducers({
  todos: todosReducer,
}), applyMiddleware(epicMw));

ReactDOM.render((
  <Provider store={store}>
    <Root />
  </Provider>
), document.getElementById('root'));
registerServiceWorker();
