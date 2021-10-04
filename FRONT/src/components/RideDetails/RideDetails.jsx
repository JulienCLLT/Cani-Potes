/* eslint-disable linebreak-style */
import React, { useEffect, useRef, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';

import L from 'leaflet';

import calendar from '../../assets/img/info-ride/calendar.svg';
import hourglass from '../../assets/img/info-ride/hourglass.svg';
import startFlag from '../../assets/img/info-ride/startPointFlag.svg';
import endFlag from '../../assets/img/info-ride/endPointFlag.svg';
import conversation from '../../assets/img/info-ride/conversation.svg';
import close from '../../assets/img/close.svg';
import peureux from '../../assets/img/profile-simulation/fearful.svg';
import joueur from '../../assets/img/profile-simulation/player.png';
import agressif from '../../assets/img/profile-simulation/aggressive.png';
import sociable from '../../assets/img/profile-simulation/sociable.svg';

import './RideDetails.scss';
import {
  sendNewMessage, addUserToRide, deleteRide, getOneRideById, getRideIsLoading, removeUserFromRide, kickUserFromRide,
} from '../../actions/rides';
import { translateDate } from '../../utils/translateDate';

const RideDetails = () => {
  const { id } = useParams();
  const chatZone = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRideIsLoading());
    dispatch(getOneRideById(id));
  }, []);

  const { user: userProfile } = useSelector((state) => state);

  const {
    ride_id, title, max_number_dogs, participants, starting_time, duration,
    description, host_first_name, host_id, messages, start_coordinate, end_coordinate, isLoading,
  } = useSelector((state) => state.rides.currentRide);

  const userIsHost = userProfile.id === host_id;

  let nbOfDogs = 0;

  participants.map((participant) => nbOfDogs += participant.dogs.length);

  participants.sort((a, b) => {
    if (a.participant_id === host_id) {
      return -1;
    }
    return 0;
  });

  const dogBehaviors = {
    peureux,
    joueur,
    agressif,
    sociable,
  };

  const { register, handleSubmit, reset } = useForm();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const [isDeleteRideModalOpen, setIsDeleteRideModalOpen] = useState(false);
  const [isKickUserModalOpen, setIsKickUserModalOpen] = useState(false);
  const [userKicked, setUserKicked] = useState(0);

  let joinInMsg = "S'inscrire";

  if (userProfile.dogs.length === 0) joinInMsg = "Vous n'avez pas de chien !";

  if (nbOfDogs > max_number_dogs) {
    joinInMsg = 'Plus de place';
  }
  if (nbOfDogs < max_number_dogs && (nbOfDogs + userProfile.dogs.length) > max_number_dogs) {
    joinInMsg = 'Vous êtes trop nombreux';
  }

  const handleJoinIn = () => {
    if (userProfile.dogs.length === 0) return;
    if (nbOfDogs < max_number_dogs) {
      if ((nbOfDogs + userProfile.dogs.length) < max_number_dogs) {
        dispatch(addUserToRide(userProfile, ride_id));
      }
    }
  };

  const handleQuit = () => {
    if (userIsHost) {
      setIsDeleteRideModalOpen(true);
    }
    else {
      dispatch(removeUserFromRide(userProfile.id, id));
    }
  };

  const handleDelete = () => {
    dispatch(deleteRide(ride_id));
    setIsRedirect(true);
  };

  const handleKick = () => {
    dispatch(kickUserFromRide(userKicked, id));
    setIsKickUserModalOpen(false);
    setUserKicked(0);
  };

  const onSubmit = ({ message }) => {
    dispatch(sendNewMessage(
      userProfile.id, id, message,
    ));

    reset();

    chatZone.current.scrollTo({
      top: chatZone.current.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  const positionStart = new L.Icon({
    iconUrl: startFlag,
    inconRetInaUrl: startFlag,
    popupAnchor: [-0, -0],
    iconSize: [22, 35],
  });

  const positionEnd = new L.Icon({
    iconUrl: endFlag,
    inconRetInaUrl: endFlag,
    popupAnchor: [-0, -0],
    iconSize: [22, 35],
  });

  return (
    <div className="ride-details">
      {isRedirect && <Redirect to="/home" />}
      <h1 className="ride-details__title">Détails d'une balade</h1>
      <section className="ride-details__infos">
        <div className="ride-details__infos__map">
          <div className="ride-details__leaflet">
            {
              isLoading ? (
                <span>chargement ...</span>
              ) : (
                <MapContainer className="ride-details__leaflet__map" center={start_coordinate} zoom={14} scrollWheelZoom>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={start_coordinate} icon={positionStart}>
                    <Popup>Départ</Popup>
                  </Marker>
                  <Marker position={end_coordinate} icon={positionEnd}>
                    <Popup>Arrivée</Popup>
                  </Marker>
                </MapContainer>
              )
            }
          </div>
          <h2>{title}</h2>
          <span>
            {nbOfDogs} / {max_number_dogs} chiens
          </span>
        </div>
        <div className="ride-details__infos__description">
          <p>
            <span className="ride-details__icon"><img src={calendar} alt="calendar" /></span>
            Départ le {translateDate(starting_time)}
          </p>
          <p>
            <span className="ride-details__icon"><img src={hourglass} alt="hourglass" /></span>
            Durée : {duration.minutes}min
          </p>
          <p>{description}</p>
        </div>
      </section>

      <section className="ride-details__users">
        <div className="ride-details__users__infos">
          <span>{participants.length} Cani Potes</span>
          {
            participants.find((participant) => participant.participant_id === userProfile.id)
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

        <div className="ride-details__container">
          <div className="ride-details__users__registered">
            {
              participants.map((participant) => (
                <div className="ride-details__current-user" key={participant.participant_id}>
                  {userIsHost && participant.participant_id !== userProfile.id && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsKickUserModalOpen(true);
                        setUserKicked(participant.participant_id);
                      }}
                    >
                      <img src={close} alt="kick user" />
                    </button>
                  )}
                  <Link
                    className="ride-details__current-user__avatar"
                    to={`/profile/${participant.participant_id}`}
                    exact
                  >
                    <img src={participant.participant_photo} alt="user" />
                    <span>{participant.participant_first_name}</span>
                  </Link>

                  <div className="ride-details__current-user__dogs-container">
                    {participant.dogs.map((dog) => (
                      <article className="ride-details__current-user__current-dog">
                        <div className="dog-avatar">
                          {dog.dog_photo && (
                            <img src={`http://107.22.144.90/dog_resized/${dog.dog_photo[0].photo_url}`} alt={dog.dog_surname} className="dog-avatar__photo" />
                          )}
                          <span>{dog.dog_surname}</span>
                          <span className="dog-avatar__behavior">
                            <img src={dogBehaviors[dog.dog_behavior]} alt="dog behavior" className="dog-avatar__behavior__logo" />
                            {dog.dog_behavior}
                          </span>
                        </div>
                        <div className="dog-details">
                          <ul>
                            <li>{dog.dog_breed}</li>
                            <li>{dog.dog_gender} {dog.dog_weight}kg</li>
                            <li>{dog.dog_sterilization ? 'Stérilisé' : 'Non stérilizé'}</li>
                          </ul>
                        </div>
                      </article>
                    ))}
                  </div>
                  {/* {participant.dogs.map((dog, index) => {
                    if (index < 3) {
                      return (
                        <div className="ride-details__current-user__dogs" key={`${dog.dog_id}`}>
                          <img src={dog.dog_photo[0].photo_url} alt={dog.dog_surname} />
                          <span>{dog.dog_surname}</span>
                          <span>
                            <img src={dogBehaviors[dog.dog_behavior]} alt="" />
                            {dog.dog_behavior}
                          </span>
                        </div>
                      );
                    }
                    if (index === (participant.dogs.length - 1)) {
                      return (
                        <div className="ride-details__current-user__dogs" key={`${dog.dog_id}`}>
                          <span>{participant.dogs.length - 3} de plus</span>
                        </div>
                      );
                    }
                  })} */}
                </div>
              ))
            }
          </div>

          <div className="ride-details__users__creator">
            <Link
              className="ride-details__users__creator__avatar"
              to={`/profile/${host_id}`}
              exact
            >
              <p>Créateur</p>
              <img src={participants[0].participant_photo} alt={host_first_name} />
              <span>{userProfile.id === host_id ? 'Vous' : host_first_name}</span>
            </Link>
          </div>
        </div>

      </section>

      {
        participants.find((participant) => participant.participant_id === userProfile.id)
        && (
        <button
          type="button"
          className={isChatOpen ? 'ride-details__toggle rotate' : 'ride-details__toggle'}
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {
            isChatOpen ? (
              <img src={close} alt="close chat" />
            ) : (
              <img src={conversation} alt="open chat" />
            )
          }
        </button>
        )
      }

      {isChatOpen && (
        <section className="ride-details__chat">

          <div className="ride-details__messages-container" ref={chatZone}>
            {
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={msg.sender_id === userProfile.id ? 'ride-details__messages-container__message my-message' : 'ride-details__messages-container__message'}
                >
                  <p>
                    {msg.participants}
                    <span>
                      {msg.sent}
                    </span>
                  </p>
                  <span>{msg.message}</span>
                </div>
              ))
            }
          </div>
          <div className="ride-details__new-message">
            <form onSubmit={handleSubmit(onSubmit)} className="ride-details__form">
              <input
                id="message"
                name="message"
                type="text"
                placeholder="Nouveau message"
                {...register('message', { required: true })}
              />
              <button type="submit">Envoyer</button>
            </form>
          </div>

        </section>
      )}

      {
        isDeleteRideModalOpen && (
          <div className="ride-details__modal">
            <p
              className="ride-details__modal__text"
            >
              Attention, vous êtes l'organisateur de cette balade
            </p>
            <p
              className="ride-details__modal__text"
            >
              En vous retirant vous la supprimerez
            </p>
            <p
              className="ride-details__modal__text"
            >
              Continuer ?
            </p>
            <div className="ride-details__modal__btn-container">
              <button
                type="button"
                className="ride-details__modal__back-btn"
                onClick={() => setIsDeleteRideModalOpen(false)}
              >
                Retour
              </button>
              <button
                type="button"
                className="ride-details__modal__delete-btn"
                onClick={() => handleDelete()}
              >
                Supprimer
              </button>
            </div>
          </div>
        )
      }

      {
        isKickUserModalOpen && (
          <div className="ride-details__modal">
            <p
              className="ride-details__modal__text"
            >
              Voulez allez retirer {
                participants.find(
                  (participant) => participant.participant_id === userKicked,
                ).participant_first_name
              } de la balade ?
            </p>
            <p
              className="ride-details__modal__text"
            >
              Continuer ?
            </p>
            <div className="ride-details__modal__btn-container">
              <button
                type="button"
                className="ride-details__modal__back-btn"
                onClick={() => {
                  setIsKickUserModalOpen(false);
                  setUserKicked(0);
                }}
              >
                Retour
              </button>
              <button
                type="button"
                className="ride-details__modal__delete-btn"
                onClick={() => handleKick()}
              >
                Retirer
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default RideDetails;
