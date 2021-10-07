/* eslint-disable linebreak-style */
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
import paw from '../../assets/img/paw.svg';

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
              <h1>
                <strong>Cani' Potes</strong>
                <br />
                <span>Pour des rencontres au poil !</span>
              </h1>
              <div>
                <img src={dogHome} alt="dogs" />
              </div>
            </div>
            <div className="connection__info__text">
              <p>
                <span>
                  Partez à la rencontre de nombreux propriétaires de chiens - Cani'Potes -
                  pour que vos toutous se sociabilisent en toute sécurité avec d'autres amis poilus.
                </span>
              </p>
            </div>
          </article>

          <article>
            <div className="connection__info__map">
              <h2>
                Ne promenez plus votre chien seul(e),
                rejoignez des Cani'Potes !
              </h2>
              <div className="connection__info__map-row-reverse">
                <div>
                  <img src={mapHome} alt="map example" />
                </div>
                <p>
                  Via la carte interactive, visualisez les balades autour de chez vous et rejoignez-les.
                  <br />
                  La promenade de vos rêves n'existe pas ? Créez la vôtre pour la proposer aux autres Cani'Potes.
                </p>
              </div>
            </div>
          </article>
          <div className="connection__info__text connection__info__text-center">
            <div>
              <h2>Commencez l'aventure simplement</h2>
              <ol>
                <div><img src={paw} alt="paw" /><img src={paw} alt="paw" /><img src={paw} alt="paw" /></div>
                <li>
                  Je me crée un compte en cliquant sur "Inscription".
                </li>
                <div><img src={paw} alt="paw" /><img src={paw} alt="paw" /><img src={paw} alt="paw" /></div>
                <li>
                  Je renseigne mes informations et celles de mon / mes chiens.
                </li>
                <div><img src={paw} alt="paw" /><img src={paw} alt="paw" /><img src={paw} alt="paw" /></div>
                <li>
                  Et c'est parti pour de belles rencontres !
                </li>
              </ol>
            </div>
          </div>
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
                  <span className="connection__form__failed">Les identifiants sont inexacts.</span>
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
