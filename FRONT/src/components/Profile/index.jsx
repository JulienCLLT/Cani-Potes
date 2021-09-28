import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../actions/users';

const Profile = () => {
  const { user, profile } = useSelector(state => state);
  const dispatch = useDispatch();
  const profileIsUser = user.id === profile.id;

  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // form for user and form for each dog for db ?
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // dispatch(updateUser())
    console.log(e);
  }

  return (
    <div className="profile-page">
      <form className="profile-page__form" onSubmit={handleSubmit}>

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
                    value={user.first_name}
                    // change state.user would be nice
                    // can change with one action with name and value
                    // catch in state like [action.name] : action.value
                    //  but if not update state doens't change ...
                    onChange={e => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={user.last_name}
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
                      {/* {dog.sexe === 'male' ? '♂' : '♀'} */} ♀
                    </span>
                    <span>
                      {/* {dog.race} */}
                      Bouvier Bernois
                    </span>
                    <span>
                      {/* {dog.behavior} */}
                      Joueur
                    </span>
                    <span>
                      {/* {dog.age} */}
                      4ans
                    </span>
                    <span>
                      {/* {dog.weight} */}
                      47kg
                    </span>
                    <span>
                      {/* {dog.sterilization} */}
                      Stérélisé
                    </span>
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
            type="submit"
          >
            Modifier
          </button>
        )}
      </form>

    </div>
  )
};

export default Profile;
