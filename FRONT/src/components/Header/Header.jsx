import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NavBarConnected from './NavBarConnected/NavBarConnected';
import NavBarDisconnected from './NavBarDisconnected/NavBarDisconnected';

import logo from '../../assets/navbar/canipotes_logo.jpg';

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
        <div className="header__logo__container">
          <img src={logo} alt="logo Cani' potes" />
        </div>
      </NavLink>
      {isLogged && <NavBarConnected />}
      {!isLogged && window.location.pathname === '/' && <NavBarDisconnected />}
    </header>
  );
};

export default Header;
