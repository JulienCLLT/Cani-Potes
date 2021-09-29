/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneUserById, getProfileIsLoading } from '../../actions/users';
import { getDogBreedsAndBehaviors } from '../../actions/signup';

import './profile.scss';

import race from '../../assets/img/profile-simulation/race.svg';
import sociable from '../../assets/img/profile-simulation/sociable.svg';
import close from '../../assets/img/close.svg';

const Profile = () => {
  const { user, profile, signup } = useSelector((state) => state);
  const dispatch = useDispatch();
  const profileIsUser = user.id === profile.id;

  const { id } = useParams();

  useEffect(() => {
    // wait for db to send profile before uncomment here
    // dispatch(getProfileIsLoading());
    dispatch(getOneUserById(id));
    dispatch(getDogBreedsAndBehaviors());
  }, []);

  // manage to edit user
  const [isEditingUser, setisEditingUser] = useState(false);
  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [zipcode, setZipcode] = useState(profile.zipcode);
  const [photoUser, setPhotoUser] = useState();

  // manage to edit dog
  const [isEditingDog, setisEditingDog] = useState(false);
  const [surname, setSurname] = useState();
  const [behavior, setBehavior] = useState();
  const [breed, setBreed] = useState();
  const [gender, setGender] = useState();
  const [weight, setWeight] = useState();
  const [age, setAge] = useState();
  const [sterilization, setSterilization] = useState();
  const [description, setDescription] = useState();
  const [photoDog, setPhotoDog] = useState();
  const [dogAndPicIndex, setDogAndPicIndex] = useState({});

  // manage modal
  const [dogIsChanged, setDogIsChanged] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPhotoOpen, setIsModalPhotoOpen] = useState(false);

  const handleSetWeight = (value) => {
    setDogIsChanged(true);
    if (value <= 0) {
      setWeight(1);
    }
    else if (value >= 200) {
      setWeight(200);
    }
    else {
      const newWeight = Number(value).toFixed(1);
      setWeight(newWeight);
    }
  };

  const toggleEditUser = () => {
    setisEditingUser(!isEditingUser);
  };

  const toggleEditDog = (index) => {
    if (isEditingDog === index + 1) setisEditingDog(0);
    else {
      setisEditingDog(index + 1);
      const editingDog = profile.dogs.find((dog, i) => i === index);

      // set default value of input by data from state
      setSurname(editingDog.dog_surname);
      setBreed(signup.breeds.find(
        (currentBreed) => currentBreed.label === editingDog.dog_breed,
      ).id);
      setBehavior(signup.behaviors.find(
        (currentBehavior) => currentBehavior.label === editingDog.dog_behavior,
      ).id);
      setGender(editingDog.dog_gender === 'femelle' ? 1 : 2);
      setWeight(editingDog.dog_weight);
      setSterilization(editingDog.dog_sterilization);
      setDescription(editingDog.dog_description);
    }
  };

  const handleUpdateUser = () => {
    setisEditingUser(false);
    // update user in db
  };

  const handleUpdateDog = () => {
    if (dogIsChanged) setDogIsChanged(false);
    if (isModalOpen) setIsModalOpen(false);
    setisEditingDog(0);
    // update dog in db
  };

  const handleDeletePhoto = () => {
    setIsModalPhotoOpen(false);
    const photoToDelete = profile.dogs[dogAndPicIndex.dogIdx].dog_photo[dogAndPicIndex.picIdx];
    // dispatch action to delete photo in db
  };

  return (
    <div className="profile-page">
      {
        profile.isLoading ? (
          <span>chargement ...</span>
        ) : (
          <>
            {
              profileIsUser && (
                <div
                  className="profile-page__edit"
                  onClick={toggleEditUser}
                >
                  {isEditingUser ? 'Retour' : 'Modifier'}
                </div>
              )
            }

            <header className="profile-page__header">
              <div>
                <span className="profile-page__header__annoucement">
                  {profileIsUser ? 'Votre profil ' : 'Profil de '}
                </span>
                <div className="profile-page__header__avatar">
                  <img src={profile.photo} alt={profile.first_name} />
                  {
                    isEditingUser && (
                      <input
                        type="file"
                        onChange={(e) => {
                          setPhotoUser(e.target.value);
                          console.log(e);
                        }}
                      />
                    )
                  }
                </div>
                <span className="profile-page__header__avatar-name">{profile.first_name}</span>
              </div>
            </header>

            <section className="profile-page__info-user">
              <h2>Informations sur l'utilisateur</h2>
              <p className="profile-page__info-user__content">
                <span className="profile-page__info-user__content-field">
                  {
                    isEditingUser ? (
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    ) : (
                      <span>{profile.first_name}</span>
                    )
                  }
                  {
                    isEditingUser ? (
                      <input
                        type="text"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                      />
                    ) : (
                      <span>{profile.last_name}</span>
                    )
                  }
                </span>
                <span className="profile-page__info-user__content-field">
                  {
                    isEditingUser ? (
                      <input
                        type="number"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                      />
                    ) : (
                      <span>Ville : {profile.zipcode}</span>
                    )
                  }
                </span>
                <span className="profile-page__info-user__content-field">
                  <span>Nombre de chien{profile.dogs.length > 1 && 's'} : {profile.dogs.length}</span>
                </span>
              </p>
              {isEditingUser && (
                <div className="profile-page__info-user__submit">
                  <button
                    type="button"
                    onClick={handleUpdateUser}
                  >
                    Enregistrer vos infos
                  </button>
                </div>
              )}
            </section>

            <section className="profile-page__info-dogs">
              {
                profile.dogs.map((dog, index) => (
                  <article>
                    <h2>
                      #{index + 1} Carte de {dog.dog_surname}
                      {
                        profileIsUser && (
                          <div
                            className="profile-page__edit__dog"
                            onClick={() => {
                              if (dogIsChanged) setIsModalOpen(true);
                              else toggleEditDog(index);
                            }}
                          >
                            {isEditingDog === index + 1 ? 'Retour' : 'Modifier'}
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
                            {dog.dog_surname} {dog.dog_gender === 'male' ? '♂' : '♀'} {dog.dog_age}
                          </span>
                        )}

                        {/* BREED WAIGHT */}
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
                                <img src={sociable} alt="comportement" />
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
                          dog.dog_photo.map((photo, photoIndex) => (
                            <div className="profile-page__dog-pictures__container-item" key={photo.photo_id}>
                              <img src={photo.photo_url} alt={dog.dog_surname} />
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
                      </div>
                    </div>
                    {(isEditingDog === index + 1) && (dog.dog_photo.length < 5) && (
                      <input
                        type="file"
                        name="photo"
                        onChange={(e) => setPhotoDog(e.target.value)}
                      />
                    )}
                    {(isEditingDog === index + 1) && (dog.dog_photo.length >= 5) && (
                      <>
                        <p>Impossible d'ajouter une photo</p>
                        <p>Veuillez en retirer</p>
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
                ))
              }
            </section>
          </>
        )
      }

      {isModalOpen && (
        <div className="profile-page__modal">
          <button
            className="profile-page__modal__close"
            type="button"
            onClick={() => setIsModalOpen(false)}
          >
            <img src={close} alt="close" />
          </button>

          <p>Attention</p>
          <p>Vous avez des modifications non enregistrées</p>

          <div className="profile-page__modal__btn">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setDogIsChanged(false);
                setisEditingDog(0);
              }}
            >
              Quitter
            </button>
            <button
              type="button"
              onClick={handleUpdateDog}
            >
              Enregistrer
            </button>
          </div>
        </div>
      )}
      {isModalPhotoOpen && (
        <div className="profile-page__modal">
          <button
            className="profile-page__modal__close"
            type="button"
            onClick={() => setIsModalPhotoOpen(false)}
          >
            <img src={close} alt="close" />
          </button>

          <p>Supprimer la photo ?</p>

          <div className="profile-page__modal__btn">
            <button
              type="button"
              onClick={() => {
                setIsModalPhotoOpen(false);
              }}
            >
              Non
            </button>
            <button
              type="button"
              onClick={handleDeletePhoto}
            >
              Oui
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;
