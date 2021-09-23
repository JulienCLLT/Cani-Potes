// required les champs

import React from 'react';

import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import './user-form.scss';

const UserForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const isFormComplete = useSelector((state) => state.isYouFormComplete);

  return (
    <div className="signup user-form">
      <div className={isFormComplete ? 'part-bullet part-bullet_complete' : 'part-bullet'}>{isFormComplete ? '✓' : ''}</div>
      <h2 className={isFormComplete ? 'title-valid' : ''}>Vous</h2>
      {/* div for display hidden */}
      <div className={isFormComplete ? 'signup-hide' : ''}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="signup__input-infos">

            {/* Email */}
            <div className="signup__input-infos__email">
              <label htmlFor="email">Votre adresse e-mail</label>
              <input {...register('email')} type="email" id="email" value="email" placeholder="Email" />
            </div>

            {/* Password */}
            <div className="signup__input-infos__password">
              <label htmlFor="password">Votre mot de passe</label>
              <input {...register('password')} type="password" id="password" value="password" placeholder="Mot de passe" />
            </div>

            {/* Password confirmation */}
            <div className="signup__input-infos__password--confirmation">
              <label htmlFor="password-confirmation">Confirmer votre mot de passe</label>
              <input {...register('password-confirmation')} type="password" id="password-confirmation" value="password-confirmation" placeholder="Confirmer mot de passe" />
            </div>

            {/* Firstname */}
            <div className="signup__input-infos__firstname">
              <label htmlFor="firstname">Votre Prénom</label>
              <input {...register('firstname')} type="text" id="firstname" value="firstname" placeholder="Prénom" />
            </div>

            {/* Name */}
            <div className="signup__input-infos__name">
              <label htmlFor="name">Votre Nom</label>
              <input {...register('name')} type="text" id="name" value="name" placeholder="Nom" />
            </div>

            {/* Zipcode */}
            <div className="signup__input-infos__zipcode">
              <p>Afin de pouvoir géolocaliser votre ville, nous avons besoin de votre code postal.</p>
              <label htmlFor="zipcode">Votre code postal</label>
              <input {...register('zipcode')} type="number" id="zipcode" value="zipcode" placeholder="Code postal" />
            </div>

            <div className="signup__input-infos__picture">
              <p>Ajouter une photo de profil</p>
            </div>

          </div>
          <button type="submit" className="dog__input-infos__back">Retour</button>
          <button type="submit" className="dog__input-infos__submit">Continuer</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
