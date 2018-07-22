import React from 'react';
import { NavLink } from 'react-router-dom';

const AppNav = (props) => (
  <nav className="AppNav">
    <NavLink
      to="/"
      exact
      className="AppNav__link"
    >
      <div className="AppNav__linkIcon ion-md-bulb" />
    </NavLink>
    <NavLink
      to="/users"
      className="AppNav__link"
    >
      <div className="AppNav__linkIcon ion-md-contacts" />
    </NavLink>
  </nav>
);

export default AppNav;
