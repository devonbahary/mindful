import React from 'react'
import { connect } from 'react-redux';
import selectUsers from '../../selectors/users';
import AppNav from '../AppNav';
import BackgroundIcon from '../BackgroundIcon';
import UsersHeader from './UsersHeader';
import LoadingSpinner from '../LoadingSpinner';
import UsersList from './UsersList';

const Users = (props) => (
  <div className="Users">
    <UsersHeader />

    <div className="Users__contents">
      {props.isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <UsersList />
          <BackgroundIcon iconClassName="ion-md-contacts" />
        </div>
      )}
    </div>
    {props.loadErr && <p>{props.loadErr}</p>}
    <AppNav />
  </div>
);

const mapStateToProps = state => ({
  users: selectUsers(state.users.users, state.filters.users),
  isLoading: state.users.isLoading,
  loadErr: state.users.loadErr
});

export default connect(mapStateToProps)(Users);
