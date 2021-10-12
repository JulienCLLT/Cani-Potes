/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  deleteDog, deleteDogPhoto, deleteUser, getOneUserById,
  getProfileIsLoading, reinitRenderAgain, updateDog, updateUser,
} from '../../actions/users';
import { getDogBreedsAndBehaviors, showDogForm } from '../../actions/signup';

import DogForm from '../SignUp/DogForm/index';
import Loader from '../Loader/index';

import './profile.scss';

import dblArrow from '../../assets/img/info-ride/double_arrow.svg';
import edit from '../../assets/img/profile-simulation/edit.svg';
import DeleteAccModal from './DeleteAccModal';
import DogSection from './DogSection/index';
import { dburlWithoutApi } from '../../utils/dburl';

const Profile = () => {
  const { user, profile, signup } = useSelector((state) => state);
  const dispatch = useDispatch();
  const profileIsUser = user.id === profile.member_id;

  const { id } = useParams();

  // manage to edit user
  const [isEditingUser, setisEditingUser] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [zipcode, setZipcode] = useState();
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
  const [isModalDeleteDogIsOpen, setIsModalDeleteDogIsOpen] = useState(false);
  const [isDogFormOpen, setIsDogFormOpen] = useState(false);

  // delete account modal
  const [isModalDeleteAccountOpen, setIsModalAccountOpen] = useState(false);
  const [inputDelete, setInputDelete] = useState('');
  const [failedToDelete, setFailedToDelete] = useState(false);

  useEffect(() => {
    setisEditingUser(false);
    setisEditingDog(false);
    dispatch(showDogForm());
    dispatch(reinitRenderAgain());
    dispatch(getProfileIsLoading());
    dispatch(getDogBreedsAndBehaviors());
    dispatch(getOneUserById(id));
  }, [id, user.renderAgain]);

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
    setFirstName(profile.first_name);
    setLastName(profile.last_name);
    setZipcode(profile.zip_code);
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
    dispatch(updateUser({
      firstName, lastName, zipcode, photoUser,
    }));
  };

  const handleUpdateDog = () => {
    const updatedDog = {
      surname,
      behavior,
      breed,
      gender,
      weight,
      age,
      sterilization,
      description,
      photoDog,
    };
    if (dogIsChanged) setDogIsChanged(false);
    if (isModalOpen) setIsModalOpen(false);
    const dogId = profile.dogs[isEditingDog - 1].dog_id;
    dispatch(updateDog(user.id, dogId, updatedDog));
    setisEditingDog(false);
  };

  const handleDeletePhoto = () => {
    setIsModalPhotoOpen(false);
    const photoToDelete = profile.dogs[dogAndPicIndex.dogIdx].dog_photo[dogAndPicIndex.picIdx];
    const dogId = profile.dogs[isEditingDog - 1].dog_id;
    dispatch(deleteDogPhoto(user.id, dogId, photoToDelete.photo_id));
  };

  const handleDeleteDog = () => {
    const dogToDelete = profile.dogs[isEditingDog - 1];
    setIsModalDeleteDogIsOpen(false);
    dispatch(deleteDog(user.id, dogToDelete.dog_id));
  };

  const handleDeleteAccount = () => {
    if (inputDelete === user.first_name) {
      dispatch(deleteUser());
    }
    else {
      setFailedToDelete(true);
    }
  };

  return (
    <div className="profile-page">
      {
        profile.isLoading ? (
          <Loader />
        ) : (
          <div className="profile-page__content-wrapper">
            <header className="profile-page__header">
              <div className="profile-page__header-container">
                <div className="profile-page__header__avatar">
                  <img src={`${dburlWithoutApi}/user_resized/${profile.photo}`} alt={profile.first_name} />
                  {
                    isEditingUser && (
                      <>
                        <label
                          htmlFor="user_photo"
                          className="profile-page__photo-label"
                        >
                          {photoUser ? `${photoUser.name}` : 'Choisir une photo'}
                        </label>
                        <input
                          type="file"
                          name="user_photo"
                          id="user_photo"
                          onChange={(e) => setPhotoUser(e.target.files[0])}
                        />
                      </>
                    )
                  }
                </div>
                <div className="profile-page__header__user">
                  <span className="profile-page__header__user__avatar-name">{profile.first_name}</span>
                  {
                    isEditingUser ? (
                      <input
                        type="number"
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                      />
                    ) : (
                      <span className="profile-page__header__user__zipcode">{profile.zip_code}</span>
                    )
                  }
                  {
                    profileIsUser && (
                      <div
                        className="profile-page__header__edit  edit-btn"
                        onClick={toggleEditUser}
                      >
                        {isEditingUser ? 'Retour' : (
                          <>
                            <img src={edit} alt="edit" />
                            Modifier
                          </>
                        )}
                      </div>
                    )
                  }
                </div>
                <section className="profile-page__info-user">
                  {profileIsUser && isEditingUser && (
                    <button
                      className="profile-page__info-user__delete-account-btn"
                      type="button"
                      onClick={() => {
                        setInputDelete('');
                        setFailedToDelete(false);
                        setIsModalAccountOpen(true);
                      }}
                    >
                      Supprimer mon compte
                    </button>
                  )}
                  {isEditingUser && (
                    <div className="profile-page__info-user__submit">
                      <button
                        type="submit"
                        onClick={handleUpdateUser}
                      >
                        Enregistrer vos infos
                      </button>
                    </div>
                  )}
                  { isEditingUser && (
                    <p className="profile-page__info-user__content">
                      <span className="profile-page__info-user__content-field">
                        {
                        isEditingUser && (
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        )
                      }
                        {
                        isEditingUser && (
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        )
                      }
                      </span>
                    </p>
                  )}
                </section>
              </div>
            </header>

            {isModalDeleteAccountOpen && (
              <DeleteAccModal
                setIsModalAccountOpen={setIsModalAccountOpen}
                inputDelete={inputDelete}
                setInputDelete={setInputDelete}
                failedToDelete={failedToDelete}
                handleDeleteAccount={handleDeleteAccount}
                firstName={user.first_name}
              />
            )}

            <section className="profile-page__info-dogs">
              {
                profile.dogs.map((dog, index) => (
                  <DogSection
                    key={dog.dog_id}
                    dog={dog}
                    index={index}
                    isEditingDog={isEditingDog}
                    setIsModalDeleteDogIsOpen={setIsModalDeleteDogIsOpen}
                    profileIsUser={profileIsUser}
                    dogIsChanged={dogIsChanged}
                    setIsModalOpen={setIsModalOpen}
                    toggleEditDog={toggleEditDog}
                    surname={surname}
                    setSurname={setSurname}
                    setDogIsChanged={setDogIsChanged}
                    gender={gender}
                    setGender={setGender}
                    setAge={setAge}
                    setBreed={setBreed}
                    breed={breed}
                    signup={signup}
                    weight={weight}
                    handleSetWeight={handleSetWeight}
                    setBehavior={setBehavior}
                    behavior={behavior}
                    sterilization={sterilization}
                    setSterilization={setSterilization}
                    setDescription={setDescription}
                    description={description}
                    setDogAndPicIndex={setDogAndPicIndex}
                    setIsModalPhotoOpen={setIsModalPhotoOpen}
                    photoDog={photoDog}
                    setPhotoDog={setPhotoDog}
                    handleUpdateDog={handleUpdateDog}
                  />
                ))
              }
            </section>
          </div>
        )
      }

      {/* DOG MODAL */}
      {isModalOpen && (
        <div className="profile-page__modal__wrapper">
          <div className="profile-page__modal">
            <button
              className="profile-page__modal__close"
              type="button"
              onClick={() => setIsModalOpen(false)}
            >
              ✖
            </button>

            <p>Vous avez des modifications non enregistrées.</p>

            <div className="profile-page__modal__btn">
              <button
                className="profile-page__modal__btn-confirm"
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
                className="profile-page__modal__btn-danger"
                type="button"
                onClick={handleUpdateDog}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOG PICTURE MODAL */}
      {isModalPhotoOpen && (
        <div className="profile-page__modal__wrapper">
          <div className="profile-page__modal">
            <button
              className="profile-page__modal__close"
              type="button"
              onClick={() => setIsModalPhotoOpen(false)}
            >
              ✖
            </button>

            <p>Supprimer la photo ?</p>

            <div className="profile-page__modal__btn">
              <button
                type="button"
                onClick={() => setIsModalPhotoOpen(false)}
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
        </div>
      )}

      {/* DOG DELETE MODAL */}
      {isModalDeleteDogIsOpen && (
        <div className="profile-page__modal__wrapper">
          <div className="profile-page__modal">
            <button
              className="profile-page__modal__close"
              type="button"
              onClick={() => setIsModalDeleteDogIsOpen(false)}
            >
              ✖
            </button>

            <p>Supprimer le chien ?</p>

            <div className="profile-page__modal__btn">
              <button
                type="button"
                onClick={() => setIsModalDeleteDogIsOpen(false)}
              >
                Non
              </button>
              <button
                type="button"
                onClick={handleDeleteDog}
              >
                Oui
              </button>
            </div>
          </div>
        </div>
      )}

      {profileIsUser && !profile.isLoading && (
        <>
          <button
            className="profile-page__btn-dogform"
            type="button"
            onClick={() => setIsDogFormOpen((old) => !old)}
          >
            Ajouter un chien<span className={isDogFormOpen ? 'close' : 'open'}><img src={dblArrow} alt="arrow" /></span>
          </button>
          <div
            className={isDogFormOpen ? 'profile-page__dogform-open' : 'profile-page__dogform-close'}
          >
            <DogForm />
          </div>
        </>
      )}

    </div>
  );
};

export default Profile;
