import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loginUser } from '../../actions/users';
import NavBarDisconnected from '../Header/NavBarDisconnected/NavBarDisconnected';

import './Connection.scss';
import close from '../../assets/img/close.svg';
import logo from '../../assets/navbar/canipotes_logo.jpg';
import dogHome from '../../assets/img/home-dogs.jpg';
import mapHome from '../../assets/img/home_map.png';

const Connection = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { failedToConnect } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="connection-container">
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

      <main className="connection">
        <div className="connection__info">
          <article>
            <div className="connection__info__title">
              <h2>
                <strong>Cani' Potes</strong>
                <br/>
                Pour des rencontres qui ont du chien
              </h2>
              <div>
                <img src={dogHome} alt="dogs" />
              </div>
            </div>
            <div className="connection__info__text">
              <p>
                <span>
                  <strong className="connection__cani-potes">Cani' Potes</strong> ? <br/>
                  <span>C'est un site au poil pour les <strong>chiens</strong> !</span>
                </span>
                <span>
                  Partez à la rencontre de nombreux Cani' Potes (comprendre "propriétaires" de chiens)
                  pour que vos toutous se sociabilisent en toute sécurité avec d'autres amis poilus
                </span>
              </p>
            </div>
          </article>

          <article>
            <div className="connection__info__title">
              <span>Trouvez via la carte interractive d'autres Cani' Potes et partez en balades organisées</span>
              <div>
                <img src={mapHome} alt="map example" />
              </div>
            </div>
            <div className="connection__info__text">
              <div>
                <span>Commencez l'aventure simplement !</span>
                <ol>
                  <li>Je me créé un compte en cliquant sur "Inscription"</li>
                  <li>Je renseigne mes informations et celles de mon / mes chiens</li>
                  <li>Depuis la carte interactive, je peux chercher une balade proposée par un autre membre</li>
                  <li>Et c'est partit pour des rencontres au poil !</li>
                  <li>Vous pourrez également créer vos propres balades !</li>
                </ol>
              </div>
            </div>
          </article>
        </div>

        {isModalOpen && (
          <div className="connection__modal">
            <button
              className="connection__modal__close"
              type="button"
              onClick={() => setIsModalOpen(false)}
            >
              <img src={close} alt="close" />
            </button>

            <form onSubmit={handleSubmit(onSubmit)} className="connection__form">
              <div className="connection__form__field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  {...register('email', { required: true })}
                />
              </div>

              <div className="connection__form__field">
                <label htmlFor="password">Mot de passe</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  {...register('password', { required: true })}
                />
              </div>

              {
                failedToConnect && (
                  <span className="connection__form__failed">Les identifiants sont inexacts</span>
                )
              }

              <button
                className="connection__form__submit"
                type="submit"
              >
                Se connecter
              </button>

            </form>
          </div>
        )}
      </main>

      <footer className="connection__footer">
        <NavBarDisconnected />
      </footer>
    </div>
  );
};

export default Connection;
