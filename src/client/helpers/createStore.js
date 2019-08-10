import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import reducers from '../reducers';

export default () => {
  const store = createStore(reducers, {}, applyMiddleware(thunk));

  return store;
};