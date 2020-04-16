import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { fetchAdmins } from '../actions';

class AdminsListPage extends PureComponent {
  componentDidMount() {
    this.props.fetchAdmins();
  }

  renderAdmins() {
    return this.props.admins.map(admin => <li key={admin.id}>{admin.name}</li>);
  }

  render() {
    return (
      <div>
        <h3>Protected list of admins</h3>
        <ul>{this.renderAdmins()}</ul>
      </div>
    );
  }
}

export default {
  component: connect(state => ({ admins: state.admins }), { fetchAdmins })(AdminsListPage),
  loadData: ({ dispatch }) => dispatch(fetchAdmins())
};