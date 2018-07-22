import React from 'react';
import AppNav from '../AppNav';
import UsersHeader from './UsersHeader';
import UsersList from './UsersList';

const Users = (props) => (
  <div className="Users">
    <UsersHeader />
    <div className="Users__contents">
      <UsersList />
    </div>
    <AppNav />
  </div>
);

export default Users;
