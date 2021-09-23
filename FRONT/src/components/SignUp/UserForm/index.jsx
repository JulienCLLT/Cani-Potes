/* eslint-disable linebreak-style */

import React from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import './user-form.scss';

const UserForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const isFormComplete = useSelector((state) => state.isUserFormComplete);

  return (
    <div className="signup user-form">
      {/* <div className={isFormComplete ? 'part-bullet part-bullet_complete' : 'part-bullet'}>{isFormComplete ? '✓' : ''}</div> */}
      <h2 className="signup__subtitle">Vous</h2>

      <div className="user-form__form"> {/* isFormComplete ? 'signup-hide' : '' */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="user-form__form__input-infos">
            <div className="user-form__form__input-infos__identity">
              {/* Email */}
              <div className="user-form__form__input-infos__email">
                <label htmlFor="email">Votre adresse e-mail</label>
                <input {...register('email', { required: true })} type="email" id="email" value="email" placeholder="Email" />
              </div>

              {/* Password */}
              <div className="user-form__form__input-infos__password">
                <label htmlFor="password">Votre mot de passe</label>
                <input {...register('password', { required: true })} type="password" id="password" value="password" placeholder="Mot de passe" />
              </div>

              {/* Password confirmation */}
              <div className="user-form__form__input-infos__password--confirmation">
                <label htmlFor="password-confirmation">Confirmer votre mot de passe</label>
                <input {...register('password-confirmation', { required: true })} type="password" id="password-confirmation" value="password-confirmation" placeholder="Confirmer mot de passe" />
              </div>

              {/* Firstname */}
              <div className="user-form__form__input-infos__firstname">
                <label htmlFor="firstname">Votre Prénom</label>
                <input {...register('firstname', { required: true })} type="text" id="firstname" value="firstname" placeholder="Prénom" />
              </div>

              {/* Name */}
              <div className="user-form__form__input-infos__name">
                <label htmlFor="name">Votre Nom</label>
                <input {...register('name', { required: true })} type="text" id="name" value="name" placeholder="Nom" />
              </div>

              {/* Picture profile */}
              <div className="user-form__form__input-infos__picture">
                <label htmlFor="user-picture">Ajouter une photo de profil</label>
                <input
                  {...register(('user-picture'))}
                  type="file"
                  id="user-picture"
                  name="user-picture"
                  accept="image/png, image/jpeg"
                />
              </div>
            </div>

            {/* Zipcode */}
            <div className="user-form__form__input-infos__zipcode">
              <p>
                Afin de pouvoir géolocaliser votre ville,
                nous avons besoin de votre code postal.
              </p>
              <div className="user-form__form__input-infos__zipcode__input">
                <label htmlFor="zipcode">Votre code postal</label>
                <input {...register('zipcode', { required: true })} type="number" id="zipcode" value="zipcode" placeholder="Code postal" />
              </div>
            </div>
          </div>
          <div className="signup__back-submit">
            <Link to="/" exact="true" className="signup__back-submit__back">Retour</Link>
            <button
              type="submit"
              className="signup__back-submit__submit"
            >Continuer
              {/* click = change état à true, isClicked ? et true = mets hidden à la div et passe dog en false */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
