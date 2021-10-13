/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';

import { updateUser } from '../../../actions/users';
import { dburlWithoutApi } from '../../../utils/dburl';

import edit from '../../../assets/img/profile-simulation/edit.svg';

const UserSection = ({
  profile, isEditingUser, setisEditingUser, profileIsUser,
  setIsModalAccountOpen, setInputDelete, setFailedToDelete,
}) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [photoUser, setPhotoUser] = useState();
  const [zipcode, setZipcode] = useState();

  const toggleEditUser = () => {
    setisEditingUser(!isEditingUser);
    setFirstName(profile.first_name);
    setLastName(profile.last_name);
    setZipcode(profile.zip_code);
  };

  const handleUpdateUser = () => {
    setisEditingUser(false);
    dispatch(updateUser({firstName, lastName, zipcode, photoUser}));
  };

  return (
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
  );
};

UserSection.propTypes = {
  profile: PropTypes.object.isRequired,
  isEditingUser: PropTypes.bool.isRequired,
  setisEditingUser: PropTypes.func.isRequired,
  profileIsUser: PropTypes.bool.isRequired,
  setIsModalAccountOpen: PropTypes.func.isRequired,
  setInputDelete: PropTypes.func.isRequired,
  setFailedToDelete: PropTypes.func.isRequired,
};

export default UserSection;
