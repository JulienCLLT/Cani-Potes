/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { nextSignupFormStep } from '../../../actions/signup';

// import svg
// import add from '../../../assets/img/plus.svg';

import './dog-form.scss';

const DogForm = () => {
  const formStep = useSelector((state) => state.signup.formStep);
  const dispatch = useDispatch();

  // useForm
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('data', data);
    dispatch(nextSignupFormStep());
  };
  const date = new Date();

  return (
    <div className={formStep === 2 ? 'signup dog' : 'hidden'}>

      <h2>Mon chien</h2>
      <div className="dog__form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="dog__form__input-infos">
            <div className="dog__form__input-infos__first">
              {/* Race */}
              <select {...register('race', { required: 'Veuillez renseigner sa race' })} className="dog__commun">
                <option value="">Race</option>
                <option value="chihuahua">chihuahua</option>
                <option value="border collie">border collie</option>
              </select>
              {errors.race && <p className="errors">{errors.race.message}</p>}

              {/* Age */}
              <input type="number" placeholder="Age" {...register('age', { required: 'Veuillez renseigner son âge', valueAsNumber: true })} defaultValue="10" className="dog__commun" />
              {errors.age && <p className="errors">{errors.age.message}</p>}

              {/* Weight */}
              <input type="number" placeholder="Poids (kg)" {...register('weight', { required: 'Veuillez renseigner son poids', valueAsNumber: true })} defaultValue="10" className="dog__commun" />
              {errors.weight && <p className="errors">{errors.weight.message}</p>}
            </div>
            <div className="dog__form__input-infos__others">

              {/* Sexe */}
              <div className="dog__form__input-infos__others__sexe">
                <p className="dog__title">Il s'agit d'un(e)</p>
                {/* Female */}
                <label htmlFor="female" className="dog__commun">
                  <input {...register('sexe', { required: 'Veuillez renseigner son sexe' })} type="radio" value="1" id="female" />
                  Femelle
                </label>
                {/* Male */}
                <label htmlFor="male" className="dog__commun">
                  <input {...register('sexe', { required: 'Veuillez renseigner son sexe' })} type="radio" value="2" id="male" />
                  Mâle
                </label>
                {errors.sexe && <p className="errors">{errors.sexe.message}</p>}
              </div>

              {/* Birthday */}
              <div className="dog__form__input-infos__others__birthday">

                <label htmlFor="birthday" className="dog__title">
                  Il est né le
                  <input
                    type="date"
                    {...register('birthday', { required: 'Veuillez renseigner sa date de naissance' })}
                    id="birthday"
                    max={`${date.getUTCFullYear().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`}
                  />
                </label>
                {errors.birthday && <p className="errors">{errors.birthday.message}</p>}
              </div>

              {/* Sterilization */}
              <div className="dog__form__input-infos__others__sterilized">
                <p className="dog__title">Il est stérilisé</p>
                <label htmlFor="sterilization-true" className="dog__commun">
                  <input {...register('sterilization', { required: "Veuillez renseigner s'il est stérilisé" })} type="radio" value="true" id="sterilization-true" />
                  Oui
                </label>
                <label htmlFor="sterilization-false" className="dog__commun">
                  <input {...register('sterilization', { required: "Veuillez renseigner s'il est stérilisé" })} type="radio" value="false" id="sterilization-false" />
                  Non
                </label>
                {errors.sterilization && <p className="errors">{errors.sterilization.message}</p>}
              </div>

              {/* Behavior */}
              <div className="dog__form__input-infos__others__character">
                <p className="dog__title">Il est plutôt du genre</p>
                <div className="dog__form__input-infos__others__character__label-flex">
                  <label htmlFor="sociable" className="dog__commun">
                    <input {...register('behavior', { required: 'Veuillez renseigner son caractère' })} type="radio" value="sociable" id="sociable" />
                    Sociable
                  </label>
                  <label htmlFor="joueur" className="dog__commun">
                    <input {...register('behavior', { required: 'Veuillez renseigner son caractère' })} type="radio" value=" joueur" id="joueur" />
                    Joueur
                  </label>
                  <label htmlFor="peureux" className="dog__commun">
                    <input {...register('behavior', { required: 'Veuillez renseigner son caractère' })} type="radio" value="peureux" id="peureux" />
                    Peureux
                  </label>
                  <label htmlFor="agressif" className="dog__commun">
                    <input {...register('behavior', { required: 'Veuillez renseigner son caractère' })} type="radio" value="agressif" id="agressif" />
                    Agressif
                  </label>
                  {errors.behavior && <p className="errors">{errors.behavior.message}</p>}
                </div>
              </div>

              {/* Surname */}
              <div className="dog__form__input-infos__others__surname">
                <label htmlFor="surname" className="dog__title">
                  Il s'appelle
                  <input type="text" placeholder="Nom" {...register('surname', { required: 'Veuillez renseigner son nom' })} id="surname" defaultValue="Alana" />
                </label>
                {errors.surname && <p className="errors">{errors.surname.message}</p>}
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
            {/* <button
            onClick={clickToPrevious}
            type="button"
            className="signup__back-submit__back"
          >Retour
          </button> */}
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
export default DogForm;
