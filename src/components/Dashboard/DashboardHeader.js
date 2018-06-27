import React from 'react';
import { connect } from 'react-redux';
import { setTopicsFilter } from '../../actions/topicsFilter';

class DashboardHeader extends React.Component {
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
    return (
      <header className={this.state.isSearch ? "DashboardHeader--search" : "DashboardHeader"}>
        <div className="DashboardHeader__mainButton" onClick={this.handleMainButtonClick}>
          <div className={`icon ${this.state.isSearch ? 'ion-md-arrow-round-back' : 'ion-md-bulb'}`} />
        </div>
        <div className="DashboardHeader__contents">
          {this.state.isSearch ? (
            <input
              type="text"
              value={this.props.topicsFilter}
              onChange={this.handleTopicsFilterTextChange}
              onBlur={this.handleBlur}
              placeholder="search topics"
              autoFocus
            />
          ) : (
            <div>
              Mindful
              <div
                className="DashboardHeader__searchButton"
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
  topicsFilter: state.topicsFilter
});

const mapDispatchToProps = (dispatch) => ({
  setTopicsFilter: (text) => dispatch(setTopicsFilter(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardHeader);
