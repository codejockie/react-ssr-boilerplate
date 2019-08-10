import Home from './components/Home';
import Posts from './components/Posts';
import Todos from './components/Todos';
import NotFound from './components/NotFound';

import UsersList, { loadData } from './containers/UsersList';

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/posts',
    component: Posts,
  },
  {
    path: '/todos',
    component: Todos,
  },
  {
    path: '/users',
    component: UsersList,
    loadData,
  },
  {
    component: NotFound
  }
];