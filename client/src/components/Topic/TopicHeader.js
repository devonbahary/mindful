import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setNotesFilter } from '../../actions/filters';
import Header from '../Header';
import SearchHeader from '../SearchHeader';
import TopicHeaderPopup from './TopicHeaderPopup';

class TopicHeader extends React.Component {
  state = {
    isPopupOpen: false,
    isSearch: false
  };

  handleMainButton = () => {
    if (this.state.isSearch) {
      this.setState(() => ({ isSearch: false }));
      this.props.setNotesFilter('');
    } else {
      const username = this.props.match.params.username;
      if (username) {
        this.props.history.push(`/users/${username}`);
      } else {
        this.props.history.push('/');
      }
    }
  }

  handleOpenSearch = () => {
    this.setState(() => ({ isSearch: true }));
    this.props.setNotesFilter('');
  };

  handleNotesFilterTextChange = (e) => {
    const searchText = e.target.value;
    this.props.setNotesFilter(searchText);
  };

  togglePopup = () => this.setState((prevState) => ({ isPopupOpen: !prevState.isPopupOpen }));

  handleOpenTopicEditModal = () => {
    this.togglePopup();
    this.props.openTopicEditModal();
  };

  handleBlur = () => {
    this.setState(() => ({ isSearch: false }));
    setTimeout(() => this.props.setNotesFilter(''), 0);
  }

  render() {
    if (this.state.isSearch) {
      return (
        <SearchHeader
          searchValue={this.props.notesFilter}
          onSearchChange={this.handleNotesFilterTextChange}
          onBlur={this.handleBlur}
          placeholder="search notes"
        />
      );
    } else {
      return (
        <Header
          mainButtonIcon="ion-md-arrow-round-back"
          onMainButton={this.handleMainButton}
          headerText={this.props.title}
        >
          {!this.props.match.params.username && (
            <div
              className={this.state.isPopupOpen ? "Header__button--active" : "Header__button"}
              onClick={this.togglePopup}
            >
              <div className="icon ion-md-more" />
            </div>
          )}
          <div
            className="Header__button"
            onClick={this.handleOpenSearch}
          >
            <div className="icon ion-md-search" />
          </div>
          {this.state.isPopupOpen && (
            <TopicHeaderPopup
              openTopicEditModal={this.handleOpenTopicEditModal}
              onClose={this.togglePopup}
            />
          )}
        </Header>
      );
    }
  };
}

const mapStateToProps = (state, ownProps) => ({
  notesFilter: state.filters.notes,
  title: ownProps.match.params.title
});

export default withRouter(connect(mapStateToProps, { setNotesFilter })(TopicHeader));
