/* eslint-disable linebreak-style */
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import {
  MapContainer, TileLayer, Marker,
} from 'react-leaflet';

import L from 'leaflet';

import calendar from '../../assets/img/info-ride/calendar.svg';
import hourglass from '../../assets/img/info-ride/hourglass.svg';
import mapPin from '../../assets/img/maps-and-flags.svg';
import doubleArrow from '../../assets/img/info-ride/double_arrow.svg';

import './RideDetails.scss';
import {
  addNewMessage, addUserToRide, deleteRide, getOneRideById, getRideIsLoading, removeUserFromRide
} from '../../actions/rides';

const RideDetails = () => {
  const { id } = useParams();
  const chatZone = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRideIsLoading());
    dispatch(getOneRideById(id));
  }, []);

  const { user: userProfile } = useSelector((state) => state);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    ride_id, title, max_number_dogs, participants, starting_time, duration,
    description, host_first_name, host_id, messages, start_coordinate, end_coordinate, isLoading,
  } = useSelector((state) => state.rides.currentRide);

  let nbOfDogs = 0;

  participants.map((participant) => nbOfDogs += participant.dogs.length);

  const { register, handleSubmit, reset } = useForm();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);

  let joinInMsg = "S'inscrire";

  if (nbOfDogs > max_number_dogs) {
    joinInMsg = 'Plus de place';
  }
  if (nbOfDogs < max_number_dogs && (nbOfDogs + userProfile.dogs.length) > max_number_dogs) {
    joinInMsg = 'Vous êtes trop nombreux';
  }

  const handleJoinIn = () => {
    if (nbOfDogs < max_number_dogs) {
      if ((nbOfDogs + userProfile.dogs.length) < max_number_dogs) {
        dispatch(addUserToRide(userProfile));
      }
    }
  };

  const handleQuit = () => {
    if (userProfile.id === host_id) {
      setIsModalOpen(true);
    }
    else {
      dispatch(removeUserFromRide(userProfile.id));
    }
  };

  const handleDelete = () => {
    dispatch(deleteRide(ride_id));
    setIsRedirect(true);
  };

  const onSubmit = ({ message }) => {
    dispatch(addNewMessage(
      message, userProfile.id, userProfile.photo, userProfile.first_name, userProfile.last_name,
    ));

    reset();

    chatZone.current.scrollTo({
      top: chatZone.current.scrollHeight,
      left: 0,
      behavior: 'smooth',
    });
  };

  const positionIcon = new L.Icon({
    iconUrl: mapPin,
    inconRetInaUrl: mapPin,
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
                <MapContainer className="ride-details__leaflet__map" center={start_coordinate} zoom={10} scrollWheelZoom={false}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={start_coordinate} icon={positionIcon} />
                  <Marker position={end_coordinate} icon={positionIcon} />
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
            Départ le {starting_time}
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
                  <NavLink
                    className="ride-details__current-user__avatar"
                    to={`/profile/${participant.participant_id}`}
                    exact
                  >
                    <img src={participant.participant_photo} alt="user" />
                    <span>{participant.participant_first_name}</span>
                  </NavLink>
                  {participant.dogs.map((dog, index) => {
                    if (index < 3) {
                      return (
                        <div className="ride-details__current-user__dogs" key={`${dog.dog_id}`}>
                          <img src={dog.dog_photo[0]} alt="dog" />
                          <span>{dog.dog_surname}</span>
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
                  })}
                </div>
              ))
            }
          </div>

          <div className="ride-details__users__creator">
            <NavLink
              className="ride-details__users__creator__avatar"
              to="/profile/:id"
              exact
            >
              <p>Créateur</p>
              <img src={participants[0].participant_photo} alt={host_first_name} />
              <span>{userProfile.id === host_id ? 'Vous' : host_first_name}</span>
            </NavLink>
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
          <img src={doubleArrow} alt="arrow" />
        </button>
        )
      }

      {isChatOpen && (
        <section className="ride-details__chat">

          <div className="ride-details__messages-container" ref={chatZone}>
            {
              messages.map((msg) => (
                <div
                  key={msg.message_id}
                  className={msg.sender_id === userProfile.id ? 'ride-details__messages-container__message my-message' : 'ride-details__messages-container__message'}
                >
                  <p>{msg.sender_first_name}
                    <span>
                      {starting_time}
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
        isModalOpen && (
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
                onClick={() => setIsModalOpen(false)}
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
    </div>
  );
};

export default RideDetails;
