/* eslint-disable linebreak-style */
import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/navbar/canipotes_logo.jpg';

import './error.scss';

const Error = () => (
  <div className="error-404">
    <header className="error-404__header">
      <div className="error-404__header__logo">
        <NavLink
          to="/home"
          exact
        >
          <img src={logo} alt="logo cani potes" />
        </NavLink>
        <NavLink
          to="/home"
          exact
        >
          Retour à l'accueil
        </NavLink>
      </div>
    </header>

    <main className="error-404__main">
      <div className="error-404__main__text-container">
        <h1>404 <br />not found</h1>
        <p>Vous êtes tombé sur un os !</p>
      </div>
    </main>
  </div>
);

export default Error;
