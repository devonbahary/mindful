import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import AddTopic from './AddTopic';
import AppNav from '../AppNav';
import BackgroundIcon from '../BackgroundIcon';
import LoadingSpinner from '../LoadingSpinner';
import ProfileHeader from './ProfileHeader';
import TopicsList from './TopicsList';

class Profile extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && !this.props.isLoading) {
      if (!this.props.user) {
        this.props.history.push('/users');
      }
    }
  };

  render() {
    const isMe = !this.props.match.params.username;
    return (
      <div className="Profile">
        <ProfileHeader />
        {isMe && <AddTopic />}
        <div className={isMe ? "Profile__contents--me" : "Profile__contents"}>
          {this.props.isLoading ? (
            <LoadingSpinner />
          ) : (
            <div>
              <TopicsList />
              <BackgroundIcon iconClassName="ion-md-person" />
            </div>
          )}
        </div>
        <AppNav />
      </div>
    );
  };
};

const mapStateToProps = (state, ownProps) => {
  let username = ownProps.match.params.username;
  if (!username) {
    return {
      isLoading: false
    };
  } else {
    return {
      isLoading: state.users.isLoading,
      user: state.users.users.find(user => user.username === username)
    };
  }
};

export default withRouter(connect(mapStateToProps)(Profile));
