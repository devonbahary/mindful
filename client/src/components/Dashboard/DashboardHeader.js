import React from 'react';
import { connect } from 'react-redux';
import { setTopicsFilter } from '../../actions/filters';
import Header from '../Header';
import SearchHeader from '../SearchHeader';

class DashboardHeader extends React.Component {
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
      return (
        <Header
          mainButtonIcon="ion-md-bulb"
          headerText="Noteable"
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

const mapStateToProps = (state) => ({
  topicsFilter: state.topicsFilter
});

const mapDispatchToProps = (dispatch) => ({
  setTopicsFilter: (text) => dispatch(setTopicsFilter(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
