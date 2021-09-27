/* eslint-disable linebreak-style */
// eslint-disable-next-line no-unused-vars
import React from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import './profile.scss';

// import img
import user from '../../../../assets/img/profile-simulation/user.jpg';
import dogPic from '../../../../assets/img/profile-simulation/dog-one.jpg';

// import icon
import race from '../../../../assets/img/profile-simulation/race.svg';
import sociable from '../../../../assets/img/profile-simulation/sociable.svg';

const Profile = ({participants, host_id}) => {
  const rideHost = participants.find((participant) => participant.participant_id === host_id);

  participants.sort((a, b) => {
    if (a.participant_id == host_id) {
      return -1;
    }
    return 0;
  });

  return (
    <div className="profile">

      <div className="profile__user">
        <div className="profile__user__img-container">
          <img src={rideHost.participant_photo} alt={`${rideHost.participant_first_name} avatar`} />
        </div>
        <h3 className="profile__user__name">
          {rideHost.participant_first_name} {rideHost.participant_last_name[0].toUpperCase()}.
        </h3>
      </div>

      {
        participants.map((participant) => (
          <article className="profile__article" key={`participant${participant.participant_id}`}>

            <div className="profile__article__avatar">
              <div className="profile__article__avatar-image">
                <img src={participant.participant_photo} alt={participant.participant_first_name} />
              </div>
              <div>
                <span>{participant.participant_first_name} {participant.participant_last_name[0].toUpperCase()}.</span>
              </div>
            </div>

            <div className="profile__article__dogs">
              {
                participant.dogs.map((dog, index) => {
                  if (index < 2) {
                    return (
                      <div className="profile__article__dogs-container" key={`participant${participant.participant_id}dog${dog.dog_id}`}>
                        <div className="profile__article__dogs-image">
                          <img src={dog.dog_photo} alt={dog.dog_surname} />
                        </div>
                        <div>
                          <span>{dog.dog_surname}</span>
                        </div>
                      </div>
                    );
                  }
                  if (index === participant.dogs.length - 1) {
                    return (
                      <span>{participant.dogs.length - 2} chien{participant.dogs.length - 2 > 1 && 's'} de plus</span>
                    );
                  }
                })
              }
            </div>

          </article>
        ))
      }

      {/* <div className="profile__dog"> */}
        {/* <img src={dogPic} alt="dog picture" /> mettre en alt nom du chien */}
        {/* <p className="profile__dog__icon"><img src={race} alt="dog icon" />Race</p>mettre en alt la race du chien ? */}
        {/* <p className="profile__dog__icon"><img src={sociable} alt="happy icon" />Comportement</p> mettre en alt le comportement du chien ? */}
      {/* </div> */}

      {/* <Link to={`/profile/${id}`} className="profile_see">Voir le profil</Link> */}
    </div>
  );
};

export default Profile;
