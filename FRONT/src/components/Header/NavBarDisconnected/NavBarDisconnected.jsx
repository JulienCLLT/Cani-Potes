/* eslint-disable linebreak-style */
import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavBarDisconnected.scss';

const NavBarDisconnected = () => (
  <nav className="navbar-disconnected">
    <NavLink
      className="navbar-disconnected__contact"
      activeClassName="navbar-disconnected__home--active"
      to="/contact"
      exact
    >
      <span>Contacts</span>
    </NavLink>

    <NavLink
      className="navbar-disconnected__legal"
      activeClassName="navbar-disconnected__board--active"
      to="/legal"
      exact
    >
      <span>Mentions légales</span>
    </NavLink>

    <NavLink
      className="navbar-disconnected__cani-crew"
      activeClassName="navbar-disconnected__profile--active"
      to="/cani-crew"
      exact
    >
      <span>Le Cani Crew !</span>
    </NavLink>
  </nav>
);

export default NavBarDisconnected;
