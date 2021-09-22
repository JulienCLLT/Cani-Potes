import React from 'react';
import { NavLink } from 'react-router-dom';

import NavBarConnected from './NavBarConnected/NavBarConnected';
import NavBarDisconnected from './NavBarDisconnected/NavBarDisconnected';

import './Header.scss';

const Header = () => {
  // fake user to test, should be taken from state
  const userIsLogged = false;

  return (
    <header className="header">
      <NavLink
        className="header__logo"
        to="/"
        exact
      >
        {/* expect logo img instead of text */}
        LOGO
      </NavLink>
      {userIsLogged && <NavBarConnected />}
      {!userIsLogged && <NavBarDisconnected />}
    </header>
  );
};

export default Header;
