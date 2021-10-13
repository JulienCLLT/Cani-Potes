/* eslint-disable linebreak-style */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import logo from '../../../assets/navbar/canipotes_logo.jpg';

import './connectionHeader.scss';

const ConnectionHeader = ({ setIsModalOpen }) => (
  <header className="header-connection">
    <NavLink
      className="header-connection__logo"
      to="/"
      exact
    >
      <img src={logo} alt="logo cani potes" />
    </NavLink>
    <h1 className="header-connection__title">Cani' Potes</h1>
    <div className="header-connection__cta">
      <button
        type="button"
        className="header-connection__cta__signin"
        onClick={() => setIsModalOpen(true)}
      >
        Connexion
      </button>
      <NavLink
        className="header-connection__cta__signup"
        to="/signup"
        exact
      >
        Inscription
      </NavLink>
    </div>
  </header>
);

ConnectionHeader.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};

export default ConnectionHeader;
