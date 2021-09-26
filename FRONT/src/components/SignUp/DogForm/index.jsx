/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { nextSignupFormStep, previousSignupFormStep } from '../../../actions/signup';

// import svg
// import add from '../../../assets/img/plus.svg';

import './dog-form.scss';

const DogForm = () => {
  const { register, formState: { errors } } = useFormContext();
  const date = new Date();

  const dispatch = useDispatch();
  const clickToContinue = () => {
    dispatch(nextSignupFormStep());
  };

  const formStep = useSelector((state) => state.signup.formStep);
  const clickToPrevious = () => {
    dispatch(previousSignupFormStep());
  };

  return (
    <div className={formStep === 2 ? 'signup dog' : 'hidden'}>

      <h2>Mon chien</h2>
      <div className="dog__form">
        <div className="dog__form__input-infos">
          <div className="dog__form__input-infos__first">
            {/* Race */}
            <select {...register('race', { required: 'Veuillez renseigner sa race' })} className="dog__commun">
              <option value="">Race</option>
              <option value="chihuahua">chihuahua</option>
              <option value="border collie">border collie</option>
            </select>
            {errors.race && <span>{errors.race.message}</span>}

            {/* Age */}
            <input type="number" placeholder="Age" {...register('age', { required: 'Veuillez renseigner son âge' })} className="dog__commun" />
            {errors.age && <span>{errors.age.message}</span>}

            {/* Weight */}
            <input type="number" placeholder="Poids (kg)" {...register('weight', { required: 'Veuillez renseigner son poids' })} className="dog__commun" />
            {errors.weight && <span>{errors.weight.message}</span>}
          </div>
          <div className="dog__form__input-infos__others">

            {/* Sexe */}
            <div className="dog__form__input-infos__others__sexe">
              <p className="dog__title">Il s'agit d'un(e)</p>
              {/* Female */}
              <label htmlFor="female" className="dog__commun">
                <input {...register('sexe', { required: true })} type="radio" value="1" id="female" name="sexe" />
                Femelle
              </label>
              {/* Male */}
              <label htmlFor="male" className="dog__commun">
                <input {...register('sexe', { required: 'Veuillez renseigner son sexe' })} type="radio" value="2" id="male" name="sexe" />
                Mâle
              </label>
              {errors.sexe && <span>{errors.sexe.message}</span>}
            </div>

            {/* Birthday */}
            <div className="dog__form__input-infos__others__birthday">

              <label htmlFor="birthday" className="dog__title">
                Il est né le
                <input
                  type="date"
                  {...register('birthday', { required: 'Veuillez renseigner sa date de naissance' })}
                  name="birthday"
                  id="birthday"
                  max={`${date.getUTCFullYear().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`}
                />
              </label>
              {errors.birthday && <span>{errors.birthday.message}</span>}
            </div>

            {/* Sterilization */}
            <div className="dog__form__input-infos__others__sterilized">
              <p className="dog__title">Il est stérilisé</p>
              <label htmlFor="sterilization-yes" className="dog__commun">
                <input {...register('sterilization', { required: true })} type="radio" name="sterilization" value="yes" id="sterilization-yes" />
                Oui
              </label>
              <label htmlFor="sterilization-no" className="dog__commun">
                <input {...register('sterilization', { required: "Veuillez renseigner s'il est stérilisé" })} type="radio" name="sterilization" value="no" id="sterilization-no" />
                Non
              </label>
              {errors.sterilization && <span>{errors.sterilization.message}</span>}
            </div>

            {/* Behavior */}
            <div className="dog__form__input-infos__others__character">
              <p className="dog__title">Il est plutôt du genre</p>
              <div className="dog__form__input-infos__others__character__label-flex">
                <label htmlFor="sociable" className="dog__commun">
                  <input {...register('behavior', { required: true })} type="radio" name="behavior" value="sociable" id="sociable" />
                  Sociable
                </label>
                <label htmlFor="joueur" className="dog__commun">
                  <input {...register('behavior', { required: true })} type="radio" name="behavior" value=" joueur" id="joueur" />
                  Joueur
                </label>
                <label htmlFor="peureux" className="dog__commun">
                  <input {...register('behavior', { required: true })} type="radio" name="behavior" value="peureux" id="peureux" />
                  Peureux
                </label>
                <label htmlFor="agressif" className="dog__commun">
                  <input {...register('behavior', { required: 'Veuillez renseigner son caractère' })} type="radio" name="behavior" value="agressif" id="agressif" />
                  Agressif
                </label>
                {errors.behavior && <span>{errors.behavior.message}</span>}
              </div>
            </div>

            {/* Surname */}
            <div className="dog__form__input-infos__others__surname">
              <label htmlFor="surname" className="dog__title">
                Il s'appelle
                <input type="text" placeholder="Nom" {...register('surname', { required: 'Veuillez renseigner son nom' })} name="surname" id="surname" />
              </label>
              {errors.surname && <span>{errors.surname.message}</span>}
            </div>
          </div>

          {/* Picture */}
          <div className="dog__form__input-infos__others__picture">
            <label htmlFor="photo_dog">
              Ajouter une photo de mon chien
              <input type="file" placeholder="photo_dog" {...register('photo_dog')} accept="image/png, image/jpeg" />
            </label>
            {/* <button type="button" className="dog__form__input-infos__others__add-dog"><img src={add} alt="add icon" />Ajouter un chien</button> */}
          </div>
        </div>
        <div className="signup__back-submit">
          <button
            onClick={clickToPrevious}
            type="button"
            className="signup__back-submit__back"
          >Retour
          </button>
          <button
            onClick={clickToContinue}
            type="button"
            className="signup__back-submit__submit"
          >Continuer
          </button>
        </div>
      </div>
    </div>
  );
};
export default DogForm;
