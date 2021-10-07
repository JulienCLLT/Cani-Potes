/* eslint-disable linebreak-style */
import React from 'react';
import { PropTypes } from 'prop-types';

import close from '../../../assets/img/close.svg';
import edit from '../../../assets/img/profile-simulation/edit.svg';
import race from '../../../assets/img/profile-simulation/race.svg';

import sociable from '../../../assets/img/profile-simulation/sociable.svg';
import agressif from '../../../assets/img/profile-simulation/aggressive.png';
import peureux from '../../../assets/img/profile-simulation/fearful.svg';
import joueur from '../../../assets/img/profile-simulation/player.png';
import { dburlWithoutApi } from '../../../utils/dburl';

const DogSection = ({
  dog, index, isEditingDog, setIsModalDeleteDogIsOpen, profileIsUser, dogIsChanged,
  setIsModalOpen, toggleEditDog, surname, setSurname, setDogIsChanged, gender,
  setGender, setAge, setBreed, breed, signup, weight, handleSetWeight,
  behavior, setBehavior, sterilization, setSterilization, setDescription,
  description, setDogAndPicIndex, setIsModalPhotoOpen, setPhotoDog, handleUpdateDog,
}) => {
  const dogBehaviors = {
    peureux,
    joueur,
    agressif,
    sociable,
  };

  return (
    <article>
      <div className="profile-page__dog">
        {/* SURNAME GENDER BIRTHDAY */}
        {isEditingDog === index + 1 ? (
          <>
            {/* <div className="profile-page__dog__display-input"> */}
            {/* Surname */}
            <input
              type="text"
              value={surname}
              minLength="3"
              maxLength="20"
              onChange={(e) => {
                setSurname(e.target.value);
                setDogIsChanged(true);
              }}
            />
            {/* Gender */}
            <span className="profile-page__dog__gender-container">
              <label htmlFor="femelle">
                Femelle
                <input
                  id="femelle"
                  type="radio"
                  name="gender"
                  value={1}
                  checked={gender === 1}
                  onChange={() => {
                    setGender(1);
                    setDogIsChanged(true);
                  }}
                />
              </label>
              <label htmlFor="male">
                Mâle
                <input
                  id="male"
                  type="radio"
                  name="gender"
                  value={2}
                  checked={gender === 2}
                  onChange={() => {
                    setGender(2);
                    setDogIsChanged(true);
                  }}
                />
              </label>
            </span>
            {/* Birthday */}
            <label htmlFor="birthday">
              Date de naissance
              <input
                type="date"
                name="birthday"
                onChange={(e) => {
                  setAge(e.target.value);
                  setDogIsChanged(true);
                }}
              />
            </label>
            {/* Race */}
            <select
              name="breed"
              onChange={(e) => {
                setBreed(e.target.value);
                setDogIsChanged(true);
              }}
              defaultValue={breed}
            >
              {signup.breeds.map((currentBreed) => (
                <option
                  key={currentBreed.id}
                  value={currentBreed.id}
                >
                  {currentBreed.label}
                </option>
              ))}
            </select>
            {/* Behavior */}
            <select
              name="behavior"
              onChange={(e) => {
                setBehavior(e.target.value);
                setDogIsChanged(true);
              }}
              defaultValue={behavior}
            >
              {signup.behaviors.map((currentBehavior) => (
                <option
                  key={currentBehavior.id}
                  value={currentBehavior.id}
                >
                  {currentBehavior.label}
                </option>
              ))}
            </select>
            {/* Weight */}
            <div>
              <label htmlFor="weight">Poids (en kg)</label>
              <input
                type="number"
                name="weight"
                id="weight"
                defaultValue={weight}
                onChange={(e) => handleSetWeight(e.target.value)}
              />
            </div>
            {/* Sterilization */}
            <label htmlFor="sterilization">
              <input
                type="checkbox"
                name="sterilization"
                id="sterilization"
                checked={sterilization}
                onChange={() => {
                  setSterilization((old) => !old);
                  setDogIsChanged(true);
                }}
              />
              Stérilisé
            </label>
            {/* Description */}
            <textarea
              maxLength="200"
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
                setDogIsChanged(true);
              }}
              defaultValue={description}
            />
          </>
        ) : (
          <>
            <div className="profile-page__dog__first">
              <div className="profile-page__dog__first__surname-gender">
                {/* Surname */}
                <span>{dog.dog_surname}</span>
                {/* Gender */}
                <span>{dog.dog_gender === 'mâle' ? '♂' : '♀'}</span>
              </div>
              {/* Birthday */}
              <span>{dog.dog_age}</span>
            </div>
            <div className="profile-page__dog__second">
              {/* Race */}
              <span>
                <img src={race} alt="race" />
                {dog.dog_breed}
              </span>
              {/* Behavior */}
              <span>
                <img src={dogBehaviors[dog.dog_behavior]} alt="comportement" />
                {dog.dog_behavior}
              </span>
            </div>
            <div className="profile-page__dog__first">
              {/* Weight */}
              <span>
                {dog.dog_weight}kg
              </span>
              {/* Sterilization */}
              <span>
                {dog.dog_sterilization ? 'Stérilisé' : 'Non stérilisé'}
              </span>
            </div>
            {/* Description */}
            <div>{dog.dog_description}</div>
          </>
        )}
      </div>

      <div className="profile-page__dog-pictures">
        <h2>Photos de {dog.dog_surname}</h2>
        <div className="profile-page__dog-pictures__container">
          {
            dog.dog_photo.length > 0 && dog.dog_photo.map((photo, photoIndex) => (
              <div className="profile-page__dog-pictures__container-item" key={photo.photo_id}>
                <img src={`${dburlWithoutApi}/dog_resized/${photo.photo_url}`} alt={dog.dog_surname} />
                {isEditingDog === index + 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      setDogAndPicIndex({ dogIdx: index, picIdx: photoIndex });
                      setIsModalPhotoOpen(true);
                    }}
                  >
                    <img src={close} alt="delete" />
                  </button>
                )}
              </div>
            ))
          }
          {dog.dog_photo.length === 0 && (
            <span>Pas de photo !</span>
          )}
        </div>
      </div>
      {(isEditingDog === index + 1) && (dog.dog_photo.length < 5) && (
        <input
          type="file"
          name="photo"
          onChange={(e) => setPhotoDog(e.target.files[0])}
        />
      )}
      {(isEditingDog === index + 1) && (dog.dog_photo.length >= 5) && (
        <>
          <p>Impossible d'ajouter une photo. Veuillez en retirer</p>
        </>
      )}
      <div className="profile-page__buttons">
        <div className="profile-page__buttons__return-submit">

          { profileIsUser && (
            <div
              onClick={() => {
                if (dogIsChanged) setIsModalOpen(true);
                else toggleEditDog(index);
              }}
            >
              {isEditingDog === index + 1 ? (
                <span className="profile-page__buttons__return-submit__return">
                  Retour
                </span>
              ) : (
                <span>
                  <img src={edit} alt="edit" />
                  Modifier
                </span>
              )}
            </div>
          )}

          {isEditingDog === index + 1 && (
          <div className="profile-page__buttons__return-submit__submit">
            <button
              type="button"
              onClick={handleUpdateDog}
            >
              Enregistrer les infos
            </button>
          </div>
          )}
        </div>

        {isEditingDog === index + 1 ? (
          <button className="profile-page__buttons__delete" type="button" onClick={() => setIsModalDeleteDogIsOpen(true)}>
            {/* <img src={close} alt="delete dog" /> */}
            Supprimer
          </button>
        ) : null }
      </div>
    </article>
  );
};

DogSection.propTypes = {
  dog: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isEditingDog: PropTypes.bool.isRequired,
  setIsModalDeleteDogIsOpen: PropTypes.func.isRequired,
  profileIsUser: PropTypes.bool.isRequired,
  dogIsChanged: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
  toggleEditDog: PropTypes.func.isRequired,
  surname: PropTypes.string,
  setSurname: PropTypes.func.isRequired,
  setDogIsChanged: PropTypes.func.isRequired,
  gender: PropTypes.number,
  setGender: PropTypes.func.isRequired,
  setAge: PropTypes.func.isRequired,
  setBreed: PropTypes.func.isRequired,
  breed: PropTypes.number,
  signup: PropTypes.object.isRequired,
  weight: PropTypes.number,
  handleSetWeight: PropTypes.func.isRequired,
  behavior: PropTypes.number,
  setBehavior: PropTypes.func.isRequired,
  sterilization: PropTypes.bool,
  setSterilization: PropTypes.func.isRequired,
  setDescription: PropTypes.func.isRequired,
  description: PropTypes.string,
  setDogAndPicIndex: PropTypes.func.isRequired,
  setIsModalPhotoOpen: PropTypes.func.isRequired,
  setPhotoDog: PropTypes.func.isRequired,
  handleUpdateDog: PropTypes.func.isRequired,
};

export default DogSection;
