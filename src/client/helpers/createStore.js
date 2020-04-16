import axios from 'axios';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import reducers from '../reducers';


export default (req) => {
  const axiosInstance = axios.create({
    baseURL: 'https://5e97ebe877f5430016339c43.mockapi.io/',
    headers: { cookie: req.get('cookie') || '' }  });
  const store = createStore(reducers, {}, applyMiddleware(thunk.withExtraArgument(axiosInstance)));

  return store;
};