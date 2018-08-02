import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { setTopicsFilter } from '../../actions/filters';
import Header from '../Header';
import SearchHeader from '../SearchHeader';

class ProfileHeader extends React.Component {
  state = {
    isSearch: false
  };

  handleOpenSearch = () => {
    this.setState(() => ({ isSearch: true }));
    this.props.setTopicsFilter('');
  };

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
          onMainButton={isMe ? () => {} : () => this.props.history.push('/users')}
          headerText={this.props.username ? this.props.username : 'Noteable'}
        >
          <div
            className="Header__button"
            onClick={this.handleOpenSearch}
          >
            <div className="icon ion-md-search" />
          </div>
        </Header>
      );
    }
  };
};

const mapStateToProps = (state, ownProps) => {
  const username = ownProps.match.params.username;
  return {
    topicsFilter: state.topicsFilter,
    username: username ? username : state.user.user.username
  };
};

const mapDispatchToProps = (dispatch) => ({
  setTopicsFilter: (text) => dispatch(setTopicsFilter(text))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileHeader));
