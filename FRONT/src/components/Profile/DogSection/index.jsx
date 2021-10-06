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
      <h2>
        <span>
          #{index + 1} Carte de {dog.dog_surname}
          {isEditingDog === index + 1 ? (
            <button type="button" onClick={() => setIsModalDeleteDogIsOpen(true)}>
              <img src={close} alt="delete dog" />
            </button>
          ) : null }
        </span>
        {
          profileIsUser && (
            <div
              className="profile-page__edit__dog"
              onClick={() => {
                if (dogIsChanged) setIsModalOpen(true);
                else toggleEditDog(index);
              }}
            >
              {isEditingDog === index + 1 ? 'Retour' : (
                <span>
                  <img src={edit} alt="edit" />
                  Modifier
                </span>
              )}
            </div>
          )
        }
      </h2>
      <div className="profile-page__dog">
        <div className="profile-page__dog__details">

          {/* SURNAME GENDER BIRTHDAY */}
          {isEditingDog === index + 1 ? (
            <div className="profile-page__dog__display-input">
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
              <label htmlFor="birthday">
                Naissance
                <input
                  type="date"
                  name="birthday"
                  onChange={(e) => {
                    setAge(e.target.value);
                    setDogIsChanged(true);
                  }}
                />
              </label>
            </div>
          ) : (
            <span>
              {dog.dog_surname} {dog.dog_gender === 'mâle' ? '♂' : '♀'} {dog.dog_age}
            </span>
          )}

          {/* BREED WEIGHT */}
          {isEditingDog === index + 1 ? (
            <div className="profile-page__dog__details-container">
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
              Poids (en kg)
              <input
                type="number"
                name="weight"
                id="weight"
                defaultValue={weight}
                onChange={(e) => handleSetWeight(e.target.value)}
              />
            </div>
          ) : (
            <div className="profile-page__dog__details-container">
              <span>
                <img src={race} alt="race" />
                {dog.dog_breed}
              </span>
              {dog.dog_weight}kg
            </div>
          )}

          {/* BEHAVIOR STERILIZATION */}
          <div className="profile-page__dog__details-container">
            {isEditingDog === index + 1 ? (
              <>
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
              </>
            ) : (
              <>
                <span>
                  <img src={dogBehaviors[dog.dog_behavior]} alt="comportement" />
                  {dog.dog_behavior}
                </span>
                {dog.dog_sterilization ? 'Stérilisé' : 'Non stérilisé'}
              </>
            )}
          </div>

          {/* DESCRIPTION */}

          {isEditingDog === index + 1 ? (
            <textarea
              maxLength="200"
              name="description"
              onChange={(e) => {
                setDescription(e.target.value);
                setDogIsChanged(true);
              }}
              defaultValue={description}
            />
          ) : (
            <div>{dog.dog_description}</div>
          )}
        </div>
      </div>

      <div className="profile-page__dog-pictures">
        <h2>Photos de {dog.dog_surname}</h2>
        <div className="profile-page__dog-pictures__container">
          {
            dog.dog_photo.length > 0 && dog.dog_photo.map((photo, photoIndex) => (
              <div className="profile-page__dog-pictures__container-item" key={photo.photo_id}>
                <img src={`http://100.25.13.11/dog_resized/${photo.photo_url}`} alt={dog.dog_surname} />
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
      {isEditingDog === index + 1 && (
        <div className="profile-page__info-user__submit">
          <button
            type="button"
            onClick={handleUpdateDog}
          >
            Enregistrer les infos
          </button>
        </div>
      )}
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
