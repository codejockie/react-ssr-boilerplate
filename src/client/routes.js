import Posts from './components/Posts';
import Todos from './components/Todos';
import NotFound from './components/NotFound';

import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';

export default [
  {
    path: '/',
    exact: true,
    ...HomePage
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
    ...UsersListPage
  },
  {
    component: NotFound
  }
];