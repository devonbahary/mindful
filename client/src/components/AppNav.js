import React from 'react';
import { NavLink } from 'react-router-dom';

const AppNav = () => (
  <nav className="AppNav">
    <NavLink
      className="AppNav__Link"
      to="/"
      exact
    >
      <div className="icon ion-md-bulb" />
    </NavLink>
    <NavLink
      className="AppNav__Link"
      to="/users"
    >
      <div className="icon ion-md-contacts" />
    </NavLink>
  </nav>
);

export default AppNav;
