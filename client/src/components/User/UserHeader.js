import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

const UserHeader = (props) => (
  <header className="UserHeader">
    <div className="UserHeader__mainButton">
      <div className="icon ion-md-person" />
    </div>
    <div className="UserHeader__contents">
      <div>
        {props.match.params.username}
        <div className="UserHeader__searchButton">
          <div className="icon ion-md-more" />
        </div>
      </div>
    </div>
  </header>
);

export default withRouter(UserHeader);
