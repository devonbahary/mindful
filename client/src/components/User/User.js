import axios from 'axios';
import React from 'react';
import AppNav from '../AppNav';
import LoadingIcon from '../LoadingIcon';
import UserHeader from './UserHeader';

class User extends React.Component {
  state = {
    user: undefined,
    isLoading: true
  };

  componentWillMount() {
    const username = this.props.match.params.username;
    axios
      .get(`/api/users/${username}`)
      .then(res => this.setState(() => ({ user: res.data, isLoading: false })))
      .catch(err => this.props.history.push('/users'));
  };

  render() {
    return (
      <div className="User">
        <UserHeader />
        {this.state.isLoading && <LoadingIcon />}
        <AppNav />
      </div>
    );
  }
};

export default User;
