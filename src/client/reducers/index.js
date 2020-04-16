import { combineReducers } from 'redux';

import users from './users';
import admins from './admins';

export default combineReducers({
  users,
  admins
});