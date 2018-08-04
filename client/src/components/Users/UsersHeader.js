import React from 'react';
import { connect } from 'react-redux';
import { setUsersFilter } from '../../actions/filters';
import Header from '../Header';
import SearchHeader from '../SearchHeader';

class UsersHeader extends React.Component {
  state = {
    isSearch: false
  };

  handleOpenSearch = () => {
    this.setState(() => ({ isSearch: true }));
    this.props.setUsersFilter('');
  };

  handleUsersFilterTextChange = (e) => {
    const searchText = e.target.value;
    this.props.setUsersFilter(searchText);
  };

  handleBlur = () => {
    this.setState(() => ({ isSearch: false }));
    setTimeout(() => this.props.setUsersFilter(''), 0);
  };

  render() {
    if (this.state.isSearch) {
      return (
        <SearchHeader
          searchValue={this.props.usersFilter}
          onSearchChange={this.handleUsersFilterTextChange}
          onBlur={this.handleBlur}
          placeholder="search users"
        />
      );
    } else {
      return (
        <Header
          mainButtonIcon="ion-md-contacts"
          headerText="Users"
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

const mapStateToProps = state => ({
  usersFilter: state.filters.users,
  isLoading: state.users.isLoading
});

export default connect(mapStateToProps, { setUsersFilter })(UsersHeader);
