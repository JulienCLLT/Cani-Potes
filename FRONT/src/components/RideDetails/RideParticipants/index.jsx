/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
import React from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { dburlWithoutApi } from '../../../utils/dburl';

import { addUserToRide, userQuitRide } from '../../../actions/rides';

import star from '../../../assets/img/star.svg';
import peureux from '../../../assets/img/profile-simulation/fearful.svg';
import joueur from '../../../assets/img/profile-simulation/player.png';
import agressif from '../../../assets/img/profile-simulation/aggressive.png';
import sociable from '../../../assets/img/profile-simulation/sociable.svg';

const RideParticipants = ({
  setIsKickUserModalOpen, setUserKicked, nbOfDogs, setIsDeleteRideModalOpen, id,
}) => {
  const dispatch = useDispatch();

  const {
    participants, host_id, max_number_dogs, ride_id,
  } = useSelector((state) => state.rides.currentRide);

  const { user: userProfile } = useSelector((state) => state);

  const userIsHost = userProfile.id === host_id;

  const dogBehaviors = {
    peureux,
    joueur,
    agressif,
    sociable,
  };

  let joinInMsg = "S'inscrire";

  if (userProfile.dogs.length === 0) joinInMsg = "Vous n'avez pas de chien !";

  if (nbOfDogs >= max_number_dogs) {
    joinInMsg = 'Plus de place';
  }
  if (nbOfDogs < max_number_dogs && (nbOfDogs + userProfile.dogs.length) > max_number_dogs) {
    joinInMsg = 'Vous êtes trop nombreux';
  }

  const handleJoinIn = () => {
    if (userProfile.dogs.length === 0) return;
    if (nbOfDogs < max_number_dogs) {
      if ((nbOfDogs + userProfile.dogs.length) <= max_number_dogs) {
        dispatch(addUserToRide(userProfile, ride_id));
      }
    }
  };

  const handleQuit = () => {
    if (userIsHost) {
      setIsDeleteRideModalOpen(true);
    }
    else {
      dispatch(userQuitRide(userProfile.id, id));
    }
  };

  return (
    <>
      <section className="ride-details__users">
        <div className="ride-details__container">
          <div className="ride-details__users__registered">
            {
              participants.map((participant) => (
                <div className="ride-details__current-user-container" key={participant.participant_id}>
                  {userIsHost && participant.participant_id !== userProfile.id && (
                    <button
                      className="ride-details__current-user__kick-btn"
                      type="button"
                      onClick={() => {
                        setIsKickUserModalOpen(true);
                        setUserKicked(participant.participant_id);
                      }}
                    >
                      ✖
                    </button>
                  )}
                  <Link className="ride-details__current-user-link" key={participant.participant_id} to={`/profile/${participant.participant_id}`}>
                    <div className="ride-details__current-user">
                      <div className="ride-details__current-user__avatar">
                        <img src={`${dburlWithoutApi}/user_resized/${participant.participant_photo}`} alt="user" />
                        <div className="ride-details__current-user__avatar-name">
                          {host_id === participant.participant_id && (
                            <div className="ride-details__current-user__star">
                              <img src={star} alt="star" />
                            </div>
                          )} {participant.participant_first_name}
                        </div>
                      </div>

                      <div className="ride-details__current-user__dogs-container">
                        {participant.dogs.map((dog) => (
                          <article className="ride-details__current-user__current-dog" key={dog.dog_id}>
                            <div className="dog-avatar">
                              {dog.dog_photo ? (
                                <img
                                  src={`${dburlWithoutApi}/dog_resized/${dog.dog_photo[0].photo_url}`}
                                  alt={dog.dog_surname}
                                  className="dog-avatar__photo"
                                />
                              ) : (
                                <img
                                  src={`${dburlWithoutApi}/dog_resized/avatar.jpg`}
                                  alt={dog.dog_surname}
                                  className="dog-avatar__photo"
                                />
                              )}
                              <span>{dog.dog_surname}</span>
                              <span>{dog.dog_gender === 'mâle' ? '♂' : '♀'}</span>

                            </div>
                            <div className="dog-details">
                              <ul>
                                <li>
                                  <span className="dog-details__behavior">
                                    <img src={dogBehaviors[dog.dog_behavior]} alt="dog behavior" className="dog-details__behavior__logo" />
                                    {dog.dog_behavior}
                                  </span>
                                </li>
                                <li>{dog.dog_breed}</li>
                                <li>{dog.dog_age} {dog.dog_weight}kg</li>
                                <li>{dog.dog_sterilization ? 'Stérilisé' : 'Non stérilisé'}</li>
                              </ul>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>

      </section>
      <div className="ride-details__registration">
        {
          participants.find(
            (participant) => participant.participant_id === userProfile.id,
          )
            ? (
              <button
                type="button"
                onClick={() => handleQuit()}
              >
                Se désinscrire
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleJoinIn()}
              >
                {joinInMsg}
              </button>
            )
          }
      </div>
    </>
  );
};

RideParticipants.propTypes = {
  setIsKickUserModalOpen: PropTypes.func.isRequired,
  setUserKicked: PropTypes.func.isRequired,
  nbOfDogs: PropTypes.number.isRequired,
  setIsDeleteRideModalOpen: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default RideParticipants;
