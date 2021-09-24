import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loginUser } from '../../actions/users';
import NavBarDisconnected from '../Header/NavBarDisconnected/NavBarDisconnected';

import './Connection.scss';
import close from '../../assets/img/close.svg';

const Connection = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (data) => {
    // dispatch action to post data to db through middleware and try to conenct
    // if connected, set user data in state
    console.log('submitted data : ', data);
    dispatch(loginUser());
  };

  return (
    <div className="connection-container">
      <header className="header-connection">
        <NavLink
          className="header-connection__logo"
          to="/"
          exact
        >
          {/* expect logo img instead of text */}
          LOGO
        </NavLink>
        <h1 className="header-connection__title">Cani Potes</h1>
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
          <div className="connection__info__text">
            <h2 className="connection__info__title">
              Bienvenue sur le site <strong>Cani Potes</strong> !
            </h2>
            <p>
              <strong>Cani Potes</strong> ? C'est quoi ça ?
              C'est un site qui a du chien !
              Oui mais c'est avant tout un site pour les <strong>chiens</strong>
              Partez à la rencontre de nombreux Cani Potes (propriétaires de chiens)
              pour que vos toutous se sociabilisent en toute sécurité avec d'autres amoureux de nos amis poilus 
            </p>
          </div>
          <div className="connection__info__map">
            GROSSE MAP DE PRESENTATION ICI
          </div>
          <div className="connection__info__text">
            <p>Pour commencer l'aventure, rien de plus simple !</p>
            <ul>
              <li>Je me créé un compte en cliquant sur "Inscription"</li>
              <li>Je renseigne mes informations et celles de mon / mes chiens</li>
              <li>Depuis la carte interactive, je peux chercher une balade proposée par un autre membre</li>
              <li>Et c'est partit pour des rencontres au poil !</li>
              <li>Vous pourrez également créer vos propres balades !</li>
            </ul>
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
