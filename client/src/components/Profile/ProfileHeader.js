import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logOutUser } from '../../actions/user';
import { setTopicsFilter } from '../../actions/filters';
import ConfirmModal from '../ConfirmModal';
import Header from '../Header';
import LogInModal from '../LogInModal';
import SearchHeader from '../SearchHeader';

class ProfileHeader extends React.Component {
  state = {
    isSearch: false,
    isLogInModalOpen: false,
    isLogOutModalOpen: false
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isSignedIn && prevState.isLogOutModalOpen && !this.props.isSignedIn) {
      this.setState(() => ({ isLogOutModalOpen: false }));
    }
  };

  handleOpenSearch = () => {
    this.setState(() => ({ isSearch: true }));
    this.props.setTopicsFilter('');
  };

  handleOpenLogIn = () => this.setState(() => ({ isLogInModalOpen: true }));

  handleCloseLogIn = () => this.setState(() => ({ isLogInModalOpen: false }));

  handleOpenLogOut = () => this.setState(() => ({ isLogOutModalOpen: true }));

  handleCloseLogOut = () => this.setState(() => ({ isLogOutModalOpen: false }));

  handleLogOut = () => this.props.logOutUser();

  handleTopicsFilterTextChange = (e) => {
    const searchText = e.target.value;
    this.props.setTopicsFilter(searchText);
  };

  handleBlur = () => {
    this.setState(() => ({ isSearch: false }));
    setTimeout(() => this.props.setTopicsFilter(''), 0);
  };

  render() {
    if (this.state.isSearch) {
      return (
        <SearchHeader
          searchValue={this.props.topicFilter}
          onSearchChange={this.handleTopicsFilterTextChange}
          onBlur={this.handleBlur}
          placeholder="search topics"
        />
      );
    } else {
      const isMe = !this.props.match.params.username;
      return (
        <Header
          mainButtonIcon={isMe ? (this.props.username ? "ion-md-person" : "ion-md-bulb") : "ion-md-arrow-round-back"}
          onMainButton={isMe ? undefined : () => this.props.history.push('/users')}
          headerText={this.props.username ? this.props.username : 'Noteable'}
        >
          {isMe && (!this.props.isSignedIn ? (
            <div
              className="Header__button"
              onClick={this.handleOpenLogIn}
            >
              <div className="icon ion-md-log-in" />
            </div>
          ) : (
            <div
              className="Header__button"
              onClick={this.handleOpenLogOut}
            >
              <div className="icon ion-md-log-out" />
            </div>
          ))}
          <div
            className="Header__button"
            onClick={this.handleOpenSearch}
          >
            <div className="icon ion-md-search" />
          </div>
          <LogInModal isModalOpen={this.state.isLogInModalOpen} onRequestClose={this.handleCloseLogIn} />
          <ConfirmModal
            isOpen={this.state.isLogOutModalOpen && this.props.isSignedIn}
            onRequestClose={this.handleCloseLogOut}
            onConfirm={this.handleLogOut}
            prompt="Sign out?"
          />
        </Header>
      );
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  const username = ownProps.match.params.username;
  return {
    topicsFilter: state.topicsFilter,
    username: username ? username : state.user.user.username,
    isSignedIn: state.user.isSignedIn
  };
};

export default withRouter(connect(mapStateToProps, { logOutUser, setTopicsFilter })(ProfileHeader));
