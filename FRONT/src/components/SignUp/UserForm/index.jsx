/* eslint-disable linebreak-style */
// required les champs

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

// action creator
import { clickContinueUser } from '../../../actions/signup';

import './user-form.scss';

const UserForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const isUserFormHide = useSelector((state) => state.signup.isUserFormHide);
  const dispatch = useDispatch();
  const clickToContinue = () => {
    dispatch(clickContinueUser());
  };

  return (
    <div className={isUserFormHide ? 'signup-hidden' : 'signup user-form'}>
      <h2 className="signup__subtitle">Vous</h2>

      <div className="user-form__form">

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
                <label htmlFor="password_confirmation">Confirmer votre mot de passe</label>
                <input {...register('password_confirmation', { required: true })} type="password" id="password_confirmation" value="password_confirmation" placeholder="Confirmer mot de passe" />
              </div>

              {/* Firstname */}
              <div className="user-form__form__input-infos__first_name">
                <label htmlFor="first_name">Votre Prénom</label>
                <input {...register('first_name', { required: true })} type="text" id="first_name" value="first_name" placeholder="Prénom" />
              </div>

              {/* Name */}
              <div className="user-form__form__input-infos__name">
                <label htmlFor="last_name">Votre Nom</label>
                <input {...register('last_name', { required: true })} type="text" id="last_name" value="last_name" placeholder="Nom" />
              </div>

              {/* Picture profile */}
              <div className="user-form__form__input-infos__picture">
                <label htmlFor="photo">Ajouter une photo de profil</label>
                <input
                  {...register(('photo'))}
                  type="file"
                  id="photo"
                  name="photo"
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
            <Link to="/" className="signup__back-submit__back">Retour</Link>
            <button
              onClick={clickToContinue}
              type="submit"
              className="signup__back-submit__submit"
            >Continuer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
