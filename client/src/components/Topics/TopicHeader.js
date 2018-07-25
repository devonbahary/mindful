import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setPointsFilter } from '../../actions/filters';
import TopicHeaderPopup from './TopicHeaderPopup';

class TopicHeader extends React.Component {
  state = {
    isPopupOpen: false,
    isSearch: false
  };

  handleMainButtonClick = () => {
    if (this.state.isSearch) {
      this.setState(() => ({ isSearch: false }));
      this.props.setPointsFilter('');
    } else {
      this.props.history.goBack();
    }
  }

  handleToggleSearch = () => {
    this.setState((prevState) => ({
      isSearch: !prevState.isSearch
    }));
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

  render() {
    return (
      <header className={this.state.isSearch ? "TopicHeader--search" : "TopicHeader"}>
        <div className="TopicHeader__mainButton" onClick={this.handleMainButtonClick} >
          <div className="icon ion-md-arrow-round-back" />
        </div>

        {this.state.isSearch ? (
          <input
            type="text"
            value={this.props.pointsFilter}
            onChange={this.handlePointsFilterTextChange}
            onBlur={this.handleBlur}
            placeholder="search notes"
            autoFocus
          />
        ) : (
          <div className="TopicHeader__contents">
            {this.props.topic && this.props.topic.name}
            <div
              className="TopicHeader__searchButton"
              onClick={this.handleToggleSearch}
            >
              <div className="icon ion-md-search" />
            </div>
            <div
              className={this.state.isPopupOpen ? "TopicHeader__popupButton--active" : "TopicHeader__popupButton"}
              onClick={this.togglePopup}
            >
              <div className="icon ion-md-more" />
            </div>
          </div>
        )}
        {this.state.isPopupOpen && <TopicHeaderPopup topic={this.props.topic} openTopicEditModal={this.handleOpenTopicEditModal} onClose={this.togglePopup} />}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  pointsFilter: state.pointsFilter
});

const mapDispatchToProps = (dispatch) => ({
  setPointsFilter: (text) => dispatch(setPointsFilter(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopicHeader));
