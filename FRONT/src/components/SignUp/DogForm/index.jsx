/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React from 'react';
// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { clickContinueDog } from '../../../actions/signup';

// import svg
import add from '../../../assets/img/plus.svg';

import './dog-form.scss';

const DogForm = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const date = new Date();

  const dispatch = useDispatch();
  const isDogFormHide = useSelector((state) => state.signup.isDogFormHide);
  const clickToContinue = dispatch(clickContinueDog());

  return (
    <div className={isDogFormHide ? 'signup-hidden' : 'signup dog'}>

      <h2>Mon chien</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="dog__form"> {/* className pas raccord, à modif */}
        <div className="dog__form__input-infos">
          <div className="dog__form__input-infos__first">
            {/* Race */}
            <select {...register('race')} id="races-select" className="dog__commun">
              <option value="">Race</option>
              <option value="test1">test1</option>
              <option value="test2">test2</option>
            </select>
            {/* Age */}
            <input {...register('age')} type="number" placeholder="Age" className="dog__commun" />
            {/* Weight */}
            <input {...register('weight')} type="number" placeholder="Poids (kg)" className="dog__commun" />
          </div>
          <div className="dog__form__input-infos__others">

            {/* Sexe */}
            <div className="dog__form__input-infos__others__sexe">
              <p className="dog__title">Il s'agit d'un(e)</p>
              {/* Female */}
              <input {...register('gender_id')} type="radio" id="femelle" value="1" checked />
              <label htmlFor="femelle" className="dog__commun">Femelle</label>
              {/* Male */}
              <input {...register('sexe')} type="radio" id="male" value="male" />
              <label htmlFor="male" className="dog__commun">Mâle</label>
            </div>

            {/* Birthday */}
            <div className="dog__form__input-infos__others__birthday">
              <label className="dog__title" htmlFor="date">Il est né le</label>
              <input
                id="birthday"
                name="birthday"
                type="date"
                max={`${date.getUTCFullYear().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`}
                {...register('birthday', { required: 'A birthday is needed' })}
              />
            </div>

            {/* Sterilization */}
            <div className="dog__form__input-infos__others__sterilized">
              <p className="dog__title">Il est stérilisé</p>
              <input {...register('sterilization')} type="radio" id="sterilized-yes" value="true" />
              <label htmlFor="sterilized-yes" className="dog__commun">Oui</label>
              <input {...register('sterilization')} type="radio" id="sterilized-no" value="false" checked />
              <label htmlFor="sterilized-no" className="dog__commun">Non</label>
            </div>

            {/* Behavior */}
            <div className="dog__form__input-infos__others__character">
              <p className="dog__title">Il est plutôt du genre</p>
              <div className="dog__form__input-infos__others__character__label-flex">
                <input {...register('behavior')} type="radio" id="sociable" value="sociable" />
                <label htmlFor="sociable" className="dog__commun">Sociable</label>

                <input {...register('behavior')} type="radio" id="joueur" value="joueur" />
                <label htmlFor="joueur" className="dog__commun">Joueur</label>

                <input {...register('behavior')} type="radio" id="peureux" value="peureux" />
                <label htmlFor="peureux" className="dog__commun">Peureux</label>

                <input {...register('behavior')} type="radio" id="agressif" value="agressif" />
                <label htmlFor="agressif" className="dog__commun">Agressif</label>
              </div>
            </div>

            {/* Surname */}
            <div className="dog__form__input-infos__others__surname">
              <label htmlFor="surname" className="dog__title">Il s'appelle</label>
              <input {...register('surname')} type="text" id="surname" placeholder="Nom" />
            </div>
          </div>
          <div className="dog__form__input-infos__others__picture">
            <label htmlFor="photo_dog">Ajouter une photo de votre chien</label>
            <input
              {...register(('photo_dog'))}
              type="file"
              id="photo_dog"
              name="photo_dog"
              accept="image/png, image/jpeg"
            />
            {/* <button type="button" className="dog__form__input-infos__others__add-dog"><img src={add} alt="add icon" />Ajouter un chien</button> */}
          </div>
        </div>
        <div className="signup__back-submit">
          <button type="submit" className="signup__back-submit__back">Retour</button>
          <button
            onClick={clickToContinue}
            type="submit"
            className="signup__back-submit__submit"
          >Continuer
          </button>
        </div>
      </form>
    </div>
  );
};
export default DogForm;
