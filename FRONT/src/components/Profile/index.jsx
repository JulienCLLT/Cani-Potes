/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneUserById, getProfileIsLoading } from '../../actions/users';

import './profile.scss';

import race from '../../assets/img/profile-simulation/race.svg';
import sociable from '../../assets/img/profile-simulation/sociable.svg';

const Profile = () => {
  const { user, profile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const profileIsUser = user.id === profile.id;

  const { id } = useParams();

  useEffect(() => {
    // wait for db to send profile before uncomment here
    // dispatch(getProfileIsLoading());
    dispatch(getOneUserById(id));
  }, []);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(profile.first_name);
  const [lastName, setLastName] = useState(profile.last_name);
  const [zipcode, setZipcode] = useState(profile.zipcode);
  const [photoUser, setPhotoUser] = useState();

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateUser = () => {
    console.log('update user in db');
    setIsEditing(false);
  };

  const handleUpdateDog = (e) => {
    e.preventDefault();
    console.log(e);
  };

  // todo check with profilereducer about data 
  // todo add form for update user and form for each dog (easier for db)

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
                  onClick={toggleEdit}
                >
                  {
                    isEditing ? 'Retour' : 'Modifier'
                  }
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
                    isEditing && (
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
                    isEditing ? (
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
                    isEditing ? (
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
                    isEditing ? (
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
              {isEditing && (
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
                  <form onSubmit={handleUpdateDog}>
                    <div className="profile-page__dog">
                      <h2>Informations du chien {index + 1}</h2>
                      <div className="profile-page__dog__details">
                        <span>
                          {dog.dog_surname} {dog.dog_gender === 'male' ? '♂' : '♀'} {dog.dog_age}
                        </span>
                        <span>
                          <img src={race} alt="race" />
                          {dog.dog_breed}
                        </span>
                        <span>
                          <img src={sociable} alt="comportement" />
                          {dog.dog_behavior}
                        </span>
                        <span>{dog.dog_sterilization ? 'Stérilisé' : 'Non stérilisé'}</span>
                        <span className="profile-page__dog__details-description">{dog.dog_description}</span>
                      </div>
                    </div>
                    <div className="profile-page__dog-pictures">
                      <h2>Photos de {dog.dog_surname}</h2>
                      <div className="profile-page__dog-pictures__container">
                        {
                          dog.dog_photo.map((photo) => (
                            <div className="profile-page__dog-pictures__container-item" key={photo.photo_id}>
                              <img src={photo.photo_url} alt={dog.dog_surname} />
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  </form>
                ))
              }
            </section>
          </>
        )
      }
    </div>
  );
};

export default Profile;
