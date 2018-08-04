import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { loadNotes } from '../../actions/notes';
import AddTopic from './AddTopic';
import AppNav from '../AppNav';
import BackgroundIcon from '../BackgroundIcon';
import LoadingSpinner from '../LoadingSpinner';
import ProfileHeader from './ProfileHeader';
import TopicsList from './TopicsList';

class Profile extends React.Component {
  componentDidMount() {
    if (this.props.user) {
      this.props.loadNotes(this.props.user._id);
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isLoading && !this.props.isLoading) {
      if (!this.props.user && !this.props.isMe) {
        this.props.history.push('/users');
      }
    } else if (prevProps.user !== this.props.user) {
      this.props.loadNotes(this.props.user._id);
    }
  };

  render() {
    return (
      <div className="Profile">
        <ProfileHeader />
        {this.props.isMe && <AddTopic />}
        <div className={this.props.isMe ? "Profile__contents--me" : "Profile__contents"}>
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
      isLoading: state.user.isLoading,
      user: state.user.user,
      isMe: true
    };
  } else {
    return {
      isLoading: state.users.isLoading,
      user: state.users.users.find(user => user.username === username)
    };
  }
};

export default withRouter(connect(mapStateToProps, { loadNotes })(Profile));
