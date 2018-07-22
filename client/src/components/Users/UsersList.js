import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';
import selectUsers from '../../selectors/users';
import LoadingIcon from '../LoadingIcon';
import UsersListItem from './UsersListItem';

class UsersList extends React.Component {
  componentWillMount() {
    this.props.getUsers();
  };

  render() {
    return (
      <ul className="UsersList">
        {this.props.loading ? (
          <LoadingIcon />
        ) : this.props.loadFail ? (
          <p>Loading did not work.</p>
        ) : this.props.users.length > 0 ? (
          this.props.users.map(user => (
            <UsersListItem key={user._id} user={user} />
          ))
        ) : (
          <p>Such empty!</p>
        )}
      </ul>
    )
  }
}

const mapStateToProps = state => ({
  users: selectUsers(state.users.users, state.usersFilter),
  loading: state.users.loading,
  loadFail: state.users.loadFail
});

export default connect(mapStateToProps, { getUsers })(UsersList);
