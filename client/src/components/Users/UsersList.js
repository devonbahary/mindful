import React from 'react';
import { connect } from 'react-redux';
import UsersListItem from './UsersListItem';

const UsersList = ({ users, isLoading }) => (
  <ul>
    {!isLoading && users.map(user => (
      <UsersListItem key={user._id} username={user.username} />
    ))}
  </ul>
);

const mapStateToProps = state => ({
  users: state.users.users.filter(user => user._id !== state.user.user._id),
  isLoading: state.users.isLoading
});

export default connect(mapStateToProps)(UsersList);
