/* eslint-disable linebreak-style */
import React from 'react';
import { NavLink } from 'react-router-dom';

import logo from '../../assets/navbar/canipotes_logo.png';

import spa from '../../assets/error404/spa.png';
import icad from '../../assets/error404/icad.png';
import petAlert from '../../assets/error404/pet-alert.png';
import chienPerdu from '../../assets/error404/chien-perdu.png';

import './error.scss';

const Error = () => (
  <div className="error-404">
    <header className="error-404__header">
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
    </header>

    <main className="error-404__main">
      <div className="error-404__main__text">
        <h1>404</h1>
        <h2>Vous êtes tombé sur un os !</h2>
        <p>Cette page n'existe pas.</p>
      </div>
    </main>

    <footer className="error-404__footer">
      <div className="error-404__footer__announcement">
        <p>Pensez à soutenir les associations protégeant les animaux.</p>
        <p>Sans vos dons, elles ne peuvent remplir leur mission.</p>
      </div>
      <div className="error-404__footer__thumbnail">
        <a target="_blank" href="https://www.la-spa.fr/" rel="noreferrer">
          <img src={spa} alt="Vignette SPA" />
        </a>
      </div>
      <div className="error-404__footer__thumbnail">
        <a target="_blank" href="https://www.i-cad.fr/" rel="noreferrer">
          <img src={icad} alt="Vignette SPA" />
        </a>
      </div>
      <div className="error-404__footer__thumbnail">
        <a target="_blank" href="https://www.petalertfrance.com/" rel="noreferrer">
          <img src={petAlert} alt="Vignette SPA" />
        </a>
      </div>
      <div className="error-404__footer__thumbnail">
        <a target="_blank" href="https://www.chien-perdu.org/fr-fr/" rel="noreferrer">
          <img src={chienPerdu} alt="Vignette SPA" />
        </a>
      </div>
    </footer>
  </div>
);

export default Error;
