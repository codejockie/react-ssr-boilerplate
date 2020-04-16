import React from 'react';
import { connect } from 'react-redux';

import { fetchUsers } from '../actions';

class UsersList extends React.Component {
  componentDidMount() {
    if (this.props.users.length < 1) {
      this.props.fetchUsers();
    }
  }

  renderUsers() {
    return this.props.users.map(user => (
      <li key={user.id}>{user.username}</li>
    ));
  }

  render() {
    return (
      <div>
        Here's a list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

export function loadData(store) {
  return store.dispatch(fetchUsers());
}

export default {
  component: connect(mapStateToProps, { fetchUsers })(UsersList),
  loadData
};