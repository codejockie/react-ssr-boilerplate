import axios from 'axios';

export const FETCH_USERS = 'app/FETCH_USERS';

export const fetchUsers = () => async dispatch => {
  const res = await axios.get('https://randomuser.me/api/?results=10');

  dispatch({ type: FETCH_USERS, payload: res });
};