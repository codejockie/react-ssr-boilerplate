import App from './App';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';

export default [
  {
    ...App,
    routes: [
      {
        ...HomePage,
        exact: true,
        path: '/',
      },
      {
        ...UsersListPage,
        path: '/users',
      },
      {
        ...AdminsListPage,
        path: '/admins',
      },
      {
        ...NotFoundPage
      }
    ]
  }
];
