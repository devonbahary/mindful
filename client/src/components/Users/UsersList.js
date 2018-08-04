import React from 'react';
import { connect } from 'react-redux';
import selectUsers from '../../selectors/users';
import UsersListItem from './UsersListItem';

const UsersList = ({ users, isLoading }) => (
  <ul>
    {!isLoading && users.map(user => (
      <UsersListItem key={user._id} username={user.username} />
    ))}
  </ul>
);

const mapStateToProps = state => ({
  users: selectUsers(state.users.users.filter(user => user._id !== state.user.user._id), state.filters.users),
  isLoading: state.users.isLoading
});

export default connect(mapStateToProps)(UsersList);
