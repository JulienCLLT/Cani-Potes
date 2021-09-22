import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBarConnected from '../NavBarConnected/NavBarConnected';

import './Header.scss';

const Header = () => {
  // fake user to test, should be taken from state
  const userIsLogged = true;

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
      {/* expect navbardisconnect but need to merge before */}
      {/* {!userIsLogged && <NavBarDisconnect />} */}

    </header>
  );
};

export default Header;
