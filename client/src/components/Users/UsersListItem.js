import React from 'react';
import { Link } from 'react-router-dom';

const UsersListItem = (props) => (
  <Link to={`/users/${props.username}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <li className="UsersListItem">
      <div className="UsersListItem__button">
        <div className="icon ion-md-person" />
      </div>
      <div className="UsersListItem__contents">
        {props.username}
      </div>
    </li>
  </Link>
);

export default UsersListItem;
