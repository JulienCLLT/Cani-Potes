import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user, profile } = useSelector(state => state);
  const profileIsUser = user.id === profile.id;

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdateUser = () => {
    // look for dispatch with useState here to update user in db and in state.user
  }

  return (
    <div className="profile-page">

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
        <span>
          {profileIsUser ? 'Votre profil ' : 'Profil de '} 
          {
            isEditing ? (
              <>
                <input
                  type="text"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                />
              </>
            ) : (
              <span>{profile.first_name} {profile.last_name}</span>
            )
          }
        </span>
        <div className="profile-page__header__avatar-img">
          <img src={profile.photo} alt={profile.first_name} />
        </div>
      </header>

      <section className="profile-page__info-user">
        <h2>Informations sur l'utilisateur</h2>
        <p>Quelles infos mettre ici ?</p>
      </section>

      <section className="profile-page__info-dogs">
        {
          profile.dogs.map((dog, index) => (
            <>
              <div className="profile-page__dog">
                <h2>Informations du chien {index + 1}</h2>
                <div className="profile-page__dog__details">
                  <span>
                    {dog.dog_surname} 
                    {/* db are not giving those data atm  */}
                    {/* {dog.sexe === 'male' ? '♂' : '♀'} */}
                  </span>
                  {/* <span>{dog.race}</span>
                  <span>{dog.behavior}</span>
                  <span>{dog.age}</span>
                  <span>{dog.weight}</span>
                  <span>{dog.sterilization}</span> */}
                </div>
              </div>
              <div className="profile-page__dog-pictures">
                <h2>Photos</h2>
                <div className="profile-page_dog-picture__container">
                  {/* map on array of pictures but db send only one picture atm */}
                  {/* {
                    dog.dog_photos.map((photo) => (
                      <div className="profile-page_dog-picture__container-item">
                        <img src={photo} alt="dog.dog_surname" />
                      </div>
                    ))
                  } */}

                  <div className="profile-page_dog-picture__container-item">
                    <img src={dog.dog_photo} alt="dog.dog_surname" />
                  </div>
                </div>
              </div>
            </>
          ))
        }
      </section>
      {isEditing && (
        <button
          type="button"
          onClick={handleUpdateUser}
        >
          Modifier
        </button>
      )}
    </div>
  )
};

export default Profile;
