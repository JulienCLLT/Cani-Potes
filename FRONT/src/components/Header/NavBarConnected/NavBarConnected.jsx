import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import home from '../../../assets/navbar/location.png';
import board from '../../../assets/navbar/tablet.png';
import profile from '../../../assets/navbar/user.svg';
import logout from '../../../assets/navbar/log-out.svg';

import { logoutUser } from '../../../actions/users';

import './NavBarConnected.scss';

const NavBarConnected = () => {
  const dispatch = useDispatch();

  return (
    <nav className="navbar-connected">
      <NavLink
        className="navbar-connected__home"
        activeClassName="navbar-connected__home--active"
        to="/home"
        exact
      >
        <div className="navbar-connected__img">
          <img src={home} alt="home" />
          <span>Home</span>
        </div>
      </NavLink>

      <NavLink
        className="navbar-connected__board"
        activeClassName="navbar-connected__board--active"
        to="/board"
        exact
      >
        <div className="navbar-connected__img">
          <img src={board} alt="board" />
          <span>Board</span>
        </div>
      </NavLink>

      <NavLink
        className="navbar-connected__profile"
        activeClassName="navbar-connected__profile--active"
        to="/profile/:id"
        exact
      >
        <div className="navbar-connected__img">
          <img src={profile} alt="profile" />
          <span>Profile</span>
        </div>
      </NavLink>

      <NavLink
        className="navbar-connected__sign-out"
        to="/"
        onClick={() => dispatch(logoutUser())}
        exact
      >
        <div className="navbar-connected__img">
          <img src={logout} alt="logout" />
          <span>Logout</span>
        </div>
      </NavLink>
    </nav>
  );
};

export default NavBarConnected;
