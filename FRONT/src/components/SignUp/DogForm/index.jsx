/* eslint-disable linebreak-style */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { dogSignUp, getDogBreedsAndBehaviors } from '../../../actions/signup';
// import SearchBar from '../SearchBar';

// import add from '../../../assets/img/plus.svg';

import './dog-form.scss';

const DogForm = () => {
  const [dogInfo, setDogInfo] = useState({
    gender: '',
    sterilization: false,
    behavior: '',
    picture: '',
  });

  const {
    formStep, breeds, behaviors, failedToSignup, errorMessage,
  } = useSelector((state) => state.signup);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogBreedsAndBehaviors());
  }, []);

  // useForm
  const {
    register, handleSubmit, formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(dogSignUp(data));
  };

  const date = new Date();

  return (
    <div className={formStep === 2 ? 'signup dog' : 'hidden'}>

      <h2>Mon chien</h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="dog__form">
          <div className="dog__form__input-infos">
            {
              failedToSignup && (
                <span className="signup__errorMessageDataBase user-form__form__input-infos__error-message">{errorMessage}</span>
              )
            }
            <div className="dog__form__input-infos__first">
              {/* Race */}
              <div className="dog__form__input-infos__first__race">
                <select {...register('breed', { required: 'Veuillez renseigner sa race', valueAsNumber: true })} className="dog__commun">
                  <option value="">Race</option>
                  {
                    breeds.map((breed) => (
                      <option value={breed.id} key={breed.id}>{breed.label}</option>
                    ))
                  }
                </select>
                {errors.race && <p className="errors">{errors.race.message}</p>}
              </div>

              {/* Weight */}
              <div className="dog__form__input-infos__first__weight">
                <input type="number" placeholder="Poids (kg)" {...register('weight', { required: 'Veuillez renseigner son poids', valueAsNumber: true, max: { value: 90, message: 'Le poids ne doit pas dépasser 90kg.' } })} className="dog__commun" />
                {errors.weight && <p className="errors">{errors.weight.message}</p>}
              </div>
            </div>
            <div className="dog__form__input-infos__others">

              {/* Sexe */}
              <div className="dog__form__input-infos__others__sexe">
                <p>Il s'agit d'un(e)</p>
                {/* Female */}
                <div className="dog__form__input-infos__others__sexe__label">
                  <label
                    className={dogInfo.gender === 'female' ? 'field-selected' : 'not-selected'}
                    htmlFor="female"
                  >
                    Femelle
                    <input
                      {...register('sexe', { required: 'Veuillez renseigner son sexe' })}
                      type="radio"
                      value="1"
                      id="female"
                      onChange={() => setDogInfo((old) => ({
                        ...old,
                        gender: 'female',
                      }))}
                    />
                  </label>

                  {/* Male */}

                  <label
                    className={dogInfo.gender === 'male' ? 'field-selected' : 'not-selected'}
                    htmlFor="male"
                  >
                    Mâle
                    <input
                      {...register('sexe', { required: 'Veuillez renseigner son sexe' })}
                      type="radio"
                      value="2"
                      id="male"
                      onChange={() => setDogInfo((old) => ({
                        ...old,
                        gender: 'male',
                      }))}
                    />
                  </label>
                </div>

                {errors.sexe && <p className="errors">{errors.sexe.message}</p>}
              </div>

              {/* Birthday */}
              <div className="dog__form__input-infos__others__birthday">

                <label htmlFor="birthday" className="dog__title">Il est né le</label>
                <input
                  className="dog__commun"
                  type="date"
                  {...register('birthday', { required: 'Veuillez renseigner sa date de naissance' })}
                  id="birthday"
                  max={`${date.getUTCFullYear().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`}
                />

                {errors.birthday && <p className="errors">{errors.birthday.message}</p>}
              </div>

              {/* Sterilization */}
              <div className="dog__form__input-infos__others__sterilized">
                <p className="dog__form__input-infos__others__sterilized_p">Il est stérilisé</p>
                <div className="dog__form__input-infos__others__sterilized__parent-label">
                  <label
                    htmlFor="sterilization-true"
                    className={dogInfo.sterilization === true ? 'dog__form__input-infos__others__sterilized__label field-selected' : 'dog__form__input-infos__others__sterilized__label'}
                  >
                    <input
                      {...register('sterilization', { required: "Veuillez renseigner s'il est stérilisé" })}
                      type="radio"
                      value="true"
                      id="sterilization-true"
                      onChange={() => setDogInfo((old) => ({
                        ...old,
                        sterilization: true,
                      }))}
                    />
                    Oui
                  </label>
                  <label
                    htmlFor="sterilization-false"
                    className={dogInfo.sterilization === false ? 'dog__form__input-infos__others__sterilized__label field-selected' : 'dog__form__input-infos__others__sterilized__label'}
                  >
                    <input
                      {...register('sterilization', { required: "Veuillez renseigner s'il est stérilisé" })}
                      type="radio"
                      value="false"
                      defaultChecked
                      id="sterilization-false"
                      onChange={() => setDogInfo((old) => ({
                        ...old,
                        sterilization: false,
                      }))}
                    />
                    Non
                  </label>
                </div>
                {errors.sterilization && <p className="errors">{errors.sterilization.message}</p>}
              </div>

              {/* Behavior */}
              <div className="dog__form__input-infos__others__character">
                <p className="dog__form__input-infos__others__character__p">Il est plutôt</p>
                <div className="dog__form__input-infos__others__character__label-flex">

                  {
                    behaviors.map((behavior) => (
                      <label
                        htmlFor={behavior.label}
                        className={dogInfo.behavior === behavior.label ? 'dog__behavior field-selected' : 'dog__behavior'}
                        key={behavior.id}
                        style={{ textTransform: 'capitalize' }}
                      >
                        <input
                          {...register('behavior', { required: 'Veuillez renseigner son caractère' })}
                          type="radio"
                          value={behavior.id}
                          id={behavior.label}
                          onChange={() => setDogInfo((old) => ({
                            ...old,
                            behavior: behavior.label,
                          }))}
                        />
                        {behavior.label}
                      </label>
                    ))
                  }
                </div>
                {errors.behavior && <p className="errors">{errors.behavior.message}</p>}
              </div>

              {/* Surname */}
              <div className="dog__form__input-infos__others__surname">
                <label htmlFor="surname" className="dog__title">
                  <p>Il s'appelle</p>
                  <input type="text" placeholder="Nom" {...register('surname', { required: 'Veuillez renseigner son nom', maxLength: { value: 20, message: 'Veuillez ne pas dépasser 20 caractères.' } })} id="surname" />
                </label>
                {errors.surname && <p className="errors">{errors.surname.message}</p>}
              </div>

              {/* Picture */}
              <div className="dog__form__input-infos__others__picture">
                <label htmlFor="photo_dog">
                  {dogInfo.picture ? dogInfo.picture : 'Ajouter une photo de mon chien'}
                  <input
                    type="file"
                    name="photo_dog"
                    id="photo_dog"
                    placeholder="Photo de mon chien"
                    {...register('photo_dog')}
                    accept="image/png, image/jpeg"
                    onChange={(e) => setDogInfo((old) => ({
                      ...old,
                      picture: e.target.files[0].name,
                    }))}
                  />
                </label>
              </div>
              {/* Description */}
              <div className="dog__form__input-infos__others__description">
                <textarea
                  rows="4"
                  placeholder="Une petite description de votre chien et de ce que vous recherchez :)"
                  {...register('description', { maxLength: { value: 200, message: 'Veuillez ne pas dépasser 200 caractères.' } })}
                />
              </div>
            </div>
          </div>
          <div className="signup__back-submit">
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
