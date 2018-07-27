import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setPointsFilter } from '../../actions/filters';
import Header from '../Header';
import SearchHeader from '../SearchHeader';
import TopicHeaderPopup from './TopicHeaderPopup';

class TopicHeader extends React.Component {
  state = {
    isPopupOpen: false,
    isSearch: false
  };

  handleMainButton = () => {
    console.log('handleMainButtons')
    if (this.state.isSearch) {
      this.setState(() => ({ isSearch: false }));
      this.props.setPointsFilter('');
    } else {
      this.props.history.goBack();
    }
  }

  handleOpenSearch = () => {
    this.setState(() => ({ isSearch: true }));
    this.props.setPointsFilter('');
  };

  handlePointsFilterTextChange = (e) => {
    const searchText = e.target.value;
    this.props.setPointsFilter(searchText);
  };

  togglePopup = () => this.setState((prevState) => ({ isPopupOpen: !prevState.isPopupOpen }));

  handleOpenTopicEditModal = () => {
    this.togglePopup();
    this.props.openTopicEditModal();
  };

  handleBlur = () => {
    this.setState(() => ({ isSearch: false }));
    this.props.setPointsFilter('');
  }

  render() {
    if (this.state.isSearch) {
      return (
        <SearchHeader
          searchValue={this.props.pointsFilter}
          onSearchChange={this.handlePointsFilterTextChange}
          onBlur={this.handleBlur}
          placeholder="search notes"
        />
      );
    } else {
      return (
        <Header
          mainButtonIcon="ion-md-arrow-round-back"
          onMainButton={this.handleMainButton}
          headerText={this.props.topic && this.props.topic.name}
        >
          <div
            className={this.state.isPopupOpen ? "Header__button--active" : "Header__button"}
            onClick={this.togglePopup}
          >
            <div className="icon ion-md-more" />
          </div>
          <div
            className="Header__button"
            onClick={this.handleOpenSearch}
          >
            <div className="icon ion-md-search" />
          </div>
          {this.state.isPopupOpen && (
            <TopicHeaderPopup
              topic={this.props.topic}
              openTopicEditModal={this.handleOpenTopicEditModal}
              onClose={this.togglePopup}
            />
          )}
        </Header>
      );
    }
  };
}

const mapStateToProps = (state) => ({
  pointsFilter: state.pointsFilter
});

const mapDispatchToProps = (dispatch) => ({
  setPointsFilter: (text) => dispatch(setPointsFilter(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopicHeader));
