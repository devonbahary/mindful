import React from 'react';
import { connect } from 'react-redux';
import { setUsersFilter } from '../../actions/usersFilter';

class UsersHeader extends React.Component {
  state = {
    isSearch: false
  };

  handleMainButtonClick = () => {
    if (this.state.isSearch) {
      this.setState(() => ({ isSearch: false }));
    }
  }

  handleToggleSearch = () => {
    this.setState((prevState) => ({
      isSearch: !prevState.isSearch
    }));
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
    return (
      <header className={this.state.isSearch ? "UsersHeader--search" : "UsersHeader"}>
        <div className="UsersHeader__mainButton" onClick={this.handleMainButtonClick}>
          <div className={`icon ${this.state.isSearch ? 'ion-md-arrow-round-back' : 'ion-md-contacts'}`} />
        </div>
        <div className="UsersHeader__contents">
          {this.state.isSearch ? (
            <input
              type="text"
              value={this.props.usersFilter}
              onChange={this.handleUsersFilterTextChange}
              onBlur={this.handleBlur}
              placeholder="search users"
              autoFocus
            />
          ) : (
            <div>
              Community
              <div
                className="UsersHeader__searchButton"
                onClick={this.handleToggleSearch}
              >
                <div className="icon ion-md-search" />
              </div>
            </div>
          )}
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  usersFilter: state.usersFilter
});

export default connect(mapStateToProps, { setUsersFilter })(UsersHeader);
