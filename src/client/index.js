import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { applyMiddleware, createStore } from 'redux';

import Routes from './routes';
import reducers from './reducers';

const axiosInstance = axios.create({ baseURL: '/api' });

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(Routes)}
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);