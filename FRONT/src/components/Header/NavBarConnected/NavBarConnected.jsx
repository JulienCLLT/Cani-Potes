/* eslint-disable linebreak-style */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import home from '../../../assets/navbar/location.svg';
import board from '../../../assets/navbar/board.svg';
import profile from '../../../assets/navbar/user.svg';
import logout from '../../../assets/navbar/log-out.svg';

import { logoutUser } from '../../../actions/users';

import './NavBarConnected.scss';

const NavBarConnected = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);

  return (
    <nav className="navbar-connected">
      <NavLink
        className="navbar-connected__link"
        activeClassName="navbar-connected__link--active"
        to="/home"
        exact
      >
        <div className="navbar-connected__img">
          <img src={home} alt="home" />
          <span>Carte</span>
        </div>
      </NavLink>

      <NavLink
        className="navbar-connected__link"
        activeClassName="navbar-connected__link--active"
        to="/board"
        exact
      >
        <div className="navbar-connected__img">
          <img src={board} alt="board" />
          <span>Tableau de bord</span>
        </div>
      </NavLink>

      <NavLink
        className="navbar-connected__link"
        activeClassName="navbar-connected__link--active"
        to={`/profile/${id}`}
        exact
      >
        <div className="navbar-connected__img">
          <img src={profile} alt="profil" />
          <span>Profil</span>
        </div>
      </NavLink>

      <NavLink
        className="navbar-connected__sign-out"
        to="/"
        onClick={() => dispatch(logoutUser())}
        exact
      >
        <div className="navbar-connected__img">
          <img src={logout} alt="deconnexion" />
          <span>Déconnexion</span>
        </div>
      </NavLink>
    </nav>
  );
};

export default NavBarConnected;
