import React from 'react';
import { Link } from 'react-router-dom';

const UsersListItem = ({ user }) => (
  <li className="UsersListItem">
    <div className="UsersListItem__friendBox">
      <div className="UsersListItem__friendBoxIcon ion-md-person-add" />
    </div>
    <Link
      to={`/users/${user.username}`}
      className="UsersListItem__userInfo"
    >
      {user.username}
    </Link>
  </li>
);

export default UsersListItem;
