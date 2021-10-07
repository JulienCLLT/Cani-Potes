/* eslint-disable linebreak-style */
// required les champs

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

// action creator
import { userSignup } from '../../../actions/signup';

import './user-form.scss';

const UserForm = () => {
  const formStep = useSelector((state) => state.signup.formStep);
  const dispatch = useDispatch();

  // useForm
  const {
    register, handleSubmit, formState: { errors }, watch,
  } = useForm();

  // if error when user signup
  const failedToSignup = useSelector((state) => state.signup.failedToSignup);
  const errorMessage = useSelector((state) => state.signup.errorMessage);

  const onSubmit = (data) => {
    dispatch(userSignup(data));
  };

  const date = new Date();

  return (
    <div className={formStep === 1 ? 'signup user-form' : 'hidden'}>
      <h2 className="signup__subtitle">Vous</h2>

      <div className="user-form__form">
        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="user-form__form__input-infos">
            <div className="user-form__form__input-infos__identity">
              {
                failedToSignup && (
                  <span className="signup__errorMessageDataBase user-form__form__input-infos__error-message">{errorMessage}</span>
                )
              }
              {/* Firstname */}
              <div className="user-form__form__input-infos__first_name">
                <input {...register('first_name', { required: 'Veuillez entrer votre prénom.', maxLength: { value: 20, message: 'Veuillez ne pas dépasser 20 caractères.' } })} type="text" placeholder="Prénom" />
                {errors.first_name && <p className="errors">{errors.first_name.message}</p>}
              </div>

              {/* Name */}
              <div className="user-form__form__input-infos__name">
                <input {...register('last_name', { required: 'Veuillez entrer votre nom.', maxLength: { value: 20, message: 'Veuillez ne pas dépasser 20 caractères.' } })} type="text" placeholder="Nom" />
                {errors.last_name && <p className="errors">{errors.last_name.message}</p>}
              </div>

              {/* Email */}
              <div className="user-form__form__input-infos__email">
                <input {...register('email', { required: 'Veuillez entrer un email.' })} type="email" placeholder="Email" />
                {errors.email && <p className="errors">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="user-form__form__input-infos__password">
                <input {...register('password', { required: 'Veuillez entrer un mot de passe.', minLength: { value: 8, message: 'Votre mot de passe doit contenir au moins 8 caractères.' }, maxLength: { value: 20, message: 'Veuillez ne pas dépasser 20 caractères.' } })} type="password" placeholder="Mot de passe" />
                {errors.password && <p className="errors">{errors.password.message}</p>}
              </div>

              {/* Password confirmation */}
              <div className="user-form__form__input-infos__password--confirmation">
                <input {...register('password_confirmation', { required: 'Veuillez confirmer votre mot de passe.', validate: (value) => value === watch('password') || 'Les mots de passe de correspondent pas' })} type="password" placeholder="Confirmer mot de passe" />
                {errors.password_confirmation && <p className="errors">{errors.password_confirmation.message}</p>}
              </div>

              {/* Birthday */}
              <div className="user-form__form__input-infos__birthday">

                <label htmlFor="birthday_user">Je suis né le</label>
                <input
                  type="date"
                  {...register('birthday_user', { required: 'Veuillez renseigner votre date de naissance.' })}
                  id="birthday_user"
                  max={`${date.getUTCFullYear().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`}
                />

                {errors.birthday_user && <p className="errors">{errors.birthday_user.message}</p>}
              </div>

              {/* Picture profile */}
              <div className="user-form__form__input-infos__picture">
                <label htmlFor="photo">Ajouter une photo de profil
                  <input
                    {...register(('photo'))}
                    type="file"
                    id="photo"
                    accept="image/png, image/jpeg"
                  />
                </label>
              </div>
            </div>

            {/* Zipcode */}
            <div className="user-form__form__input-infos__zipcode">
              <p className="user-form__form__input-infos__zipcode__p">
                Afin de pouvoir géolocaliser votre ville,
                nous avons besoin de votre code postal.
              </p>
              <div className="user-form__form__input-infos__zipcode__input">
                <input
                  {...register('zip_code', {
                    required: 'Veuillez entrer un code postal.',
                    minLength: { value: 5, message: 'Veuillez entrer un code postal à 5 chiffres.' },
                    maxLength: { value: 5, message: 'Veuillez entrer un code postal à 5 chiffres.' },
                    pattern: /^(?!00|96|99)\d{5}$/,
                  })}
                  type="text"
                  placeholder="Code postal"
                />
                {errors.zip_code && <p className="errors">{errors.zip_code.message}</p>}
                {}
              </div>
            </div>
          </div>
          <div className="signup__back-submit">
            <Link to="/" className="signup__back-submit__back">Retour</Link>
            <button
              type="submit"
              className="signup__back-submit__submit"
            >Valider
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
