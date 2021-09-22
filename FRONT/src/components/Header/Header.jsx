import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBarConnected from './NavBarConnected/NavBarConnected';
import NavBarDisconnected from './NavBarDisconnected/NavBarDisconnected';

import './Header.scss';

const Header = () => {
  const { isLogged } = useSelector((state) => state.user);

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
      {isLogged && <NavBarConnected />}
      {!isLogged && <NavBarDisconnected />}
    </header>
  );
};

export default Header;
