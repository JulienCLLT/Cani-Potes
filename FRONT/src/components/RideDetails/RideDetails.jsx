/* eslint-disable linebreak-style */
import React, { useEffect, useRef, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';

import L from 'leaflet';

import Loader from '../Loader/index';

import calendar from '../../assets/img/info-ride/calendar-blue.svg';
import hourglass from '../../assets/img/info-ride/hourglass-orange.svg';
import startFlag from '../../assets/img/info-ride/startPointFlag.svg';
import endFlag from '../../assets/img/info-ride/endPointFlag.svg';
import conversation from '../../assets/img/info-ride/conversation.svg';
import star from '../../assets/img/star.svg';
import peureux from '../../assets/img/profile-simulation/fearful.svg';
import joueur from '../../assets/img/profile-simulation/player.png';
import agressif from '../../assets/img/profile-simulation/aggressive.png';
import sociable from '../../assets/img/profile-simulation/sociable.svg';
import flag from '../../assets/img/info-ride/flag-green.svg';
import starting from '../../assets/img/info-ride/map-pin-red.svg';
import nbdog from '../../assets/img/info-ride/nbdog.svg';
import nbcanipote from '../../assets/img/info-ride/nbcanipote.svg';

import {
  sendNewMessage, addUserToRide, deleteRide, getOneRideById,
  getRideIsLoading, userQuitRide, kickUserFromRide,
} from '../../actions/rides';
import { translateDate } from '../../utils/translateDate';
import { reverseGeocoding } from '../../utils/reverseGeocoding';

import './RideDetails.scss';
import Header from '../Header/Header';
import { reinitRenderAgain } from '../../actions/users';
import { dburlWithoutApi } from '../../utils/dburl';

const RideDetails = () => {
  const { id } = useParams();
  const chatZone = useRef();
  const dispatch = useDispatch();

  const { user: userProfile } = useSelector((state) => state);
  const {
    ride_id, title, max_number_dogs, participants, starting_time, duration, description,
    host_id, messages, start_coordinate, end_coordinate, isLoading, rideDoesNotExist,
  } = useSelector((state) => state.rides.currentRide);
  const { errorMessage } = useSelector((state) => state.rides);

  useEffect(() => {
    dispatch(reinitRenderAgain());
    dispatch(getRideIsLoading());
    dispatch(getOneRideById(id));
  }, [userProfile.renderAgain]);


  const [startPointAddress, setStartPointAddress] = useState('');
  const [endPointAddress, setEndPointAddress] = useState('');
  reverseGeocoding(start_coordinate, setStartPointAddress);
  reverseGeocoding(end_coordinate, setEndPointAddress);

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

  const handleDelete = () => {
    dispatch(deleteRide(ride_id));
    setIsRedirect(true);
  };

  const handleKick = () => {
    dispatch(kickUserFromRide(userKicked, id));
    setIsKickUserModalOpen(false);
    setUserKicked(0);
  };

  const scrollDownChat = () => {
    setTimeout(() => {
      chatZone.current.scrollTo({
        top: chatZone.current.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 250);
  };

  const onSubmit = ({ message }) => {
    dispatch(sendNewMessage(
      userProfile.id, id, message,
    ));

    reset();

    scrollDownChat();
  };

  const positionStart = new L.Icon({
    iconUrl: startFlag,
    inconRetInaUrl: startFlag,
    popupAnchor: [-0, -0],
    iconSize: [35, 42],
  });

  const positionEnd = new L.Icon({
    iconUrl: endFlag,
    inconRetInaUrl: endFlag,
    popupAnchor: [-0, -0],
    iconSize: [35, 42],
  });

  return (
    <>
      <Header />
      {
        errorMessage === 'Ride not found' ? (
          <div className="ride-details__ride-not-found">Balade non trouvée</div>
        ) : (
          <>
            <main>
              <div className="ride-details">
                {isRedirect && <Redirect to="/home" />}
                <section className="ride-details__map">
                  {/* <div className="ride-details__infos__map"> */}
                  <div className="ride-details__leaflet">
                    {
                        isLoading ? (
                          <Loader />
                        ) : (
                          <MapContainer className="ride-details__leaflet__map" center={start_coordinate} zoom={16} scrollWheelZoom zoomControl={false}>
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
                  {/* </div> */}
                </section>
                <section className="ride-details__infos">
                  <div className="ride-details__infos__header">
                    <h2>{title}</h2>
                    <div className="ride-details__infos__header__number">
                      <span>
                        <img src={nbdog} alt="icon dog" />
                        {nbOfDogs} / {max_number_dogs} chiens
                      </span>
                      <span>
                        <img src={nbcanipote} alt="icon human" />
                        {participants.length} Cani Potes
                      </span>
                    </div>
                  </div>
                  <div className="ride-details__infos__description">
                    <p>
                      <span className="ride-details__icon"><img src={calendar} alt="calendar" /></span>
                      {translateDate(starting_time)}
                    </p>
                    <p>
                      <span className="ride-details__icon"><img src={hourglass} alt="hourglass" /></span>
                      Durée : {duration.minutes ? `${duration.minutes} min` : 'indeterminée'}
                    </p>
                    <p>
                      <span className="ride-details__icon"><img src={starting} alt="starting" /></span>
                      Départ : <br />{startPointAddress}
                    </p>
                    <p>
                      <span className="ride-details__icon"><img src={flag} alt="flag" /></span>
                      Arrivée : <br />{endPointAddress}
                    </p>
                    <p>{description}</p>
                  </div>
                </section>

                <section className="ride-details__users">
                  <div className="ride-details__container">
                    <div className="ride-details__users__registered">
                      {
                        participants.map((participant) => (
                          <div className="ride-details__current-user-container">
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
                            <Link className="ride-details__current-user-link" key={participant.participant_id}>
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
                                        {dog.dog_photo && (
                                          <img src={`${dburlWithoutApi}/dog_resized/${dog.dog_photo[0].photo_url}`} alt={dog.dog_surname} className="dog-avatar__photo" />
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

                {
                  participants.find(
                    (participant) => participant.participant_id === userProfile.id,
                  ) && (
                    <button
                      type="button"
                      className={isChatOpen ? 'ride-details__toggle chat-open' : 'ride-details__toggle'}
                      onClick={() => {
                        setIsChatOpen(!isChatOpen);
                        scrollDownChat();
                      }}
                    >
                      {
                        isChatOpen ? (
                          '✖'
                        ) : (
                          <img src={conversation} alt="open chat" />
                        )
                      }
                    </button>
                  )
                }

                {isChatOpen && (
                  <section className="ride-details__chat">
                    <div className="ride-details__chat__messages-container" ref={chatZone}>
                      {
                        messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={msg.sender_id === userProfile.id ? 'ride-details__chat__messages-container__message my-message' : 'ride-details__chat__messages-container__message'}
                          >
                            <div className="ride-details__message__avatar">
                              <span className="ride-details__message__pic">
                                <img src={`${dburlWithoutApi}/user_resized/${msg.sender_photo}`} alt={msg.sender_first_name} />
                              </span>
                              <div className="ride-details__message__sent-info">
                                <span className="ride-details__message__sent-name">
                                  {msg.sender_first_name}
                                </span>
                                <span className="ride-details__message__sent-date">
                                  {translateDate(msg.sent)}
                                </span>
                              </div>
                            </div>

                            <span>{msg.message}</span>
                          </div>
                        ))
                      }
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="ride-details__chat__new-message">
                      <input
                        id="message"
                        name="message"
                        type="text"
                        placeholder="Nouveau message"
                        {...register('message', { required: true })}
                      />
                      <button type="submit">Envoyer</button>
                    </form>

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
            </main>
          </>
        )
      }
    </>
  );
};

export default RideDetails;
