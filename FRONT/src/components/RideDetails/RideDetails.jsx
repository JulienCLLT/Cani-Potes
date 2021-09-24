import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

// before beeing able to ask to db real url, simulating
import user from '../../assets/img/profile-simulation/user.jpg';
import dogPic from '../../assets/img/profile-simulation/dog-one.jpg';
import calendar from '../../assets/img/info-ride/calendar.svg';
import hourglass from '../../assets/img/info-ride/hourglass.svg';

import './RideDetails.scss';

const RideDetails = () => {
  const { currentRide } = useSelector((state) => state.rides);

  const {
    title, max_number_dogs, participants, starting_time, duration, description, host_first_name, host_id, messages,
  } = useSelector((state) => state.rides.currentRide);

  let nbOfDogs = 0;

  participants.map((participant) => nbOfDogs += participant.dogs.length);

  const { register, handleSubmit } = useForm();

  const [isChatOpen, setIsChatOpen] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="ride-details">
      <h1 className="ride-details__title">Détails d'une balade</h1>
      <section className="ride-details__infos">
        <div className="ride-details__infos__map">
          <div className="ride-details__leaflet">
            LEAFLET PROJECTION
          </div>
          <h2>{title}</h2>
          <span>
            {nbOfDogs} / {max_number_dogs} chiens
          </span>
        </div>
        <div className="ride-details__infos__description">
          <p>
            <div className="ride-details__icon"><img src={calendar} alt="calendar" /></div>
            Départ le
            {new Date(starting_time).toLocaleDateString(undefined, {
              weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric',
            })}
          </p>
          <p>
            <div className="ride-details__icon"><img src={hourglass} alt="hourglass" /></div>
            Durée : {duration.minutes}min
            </p>
          <p>{description}</p>
        </div>
      </section>

      <section className="ride-details__users">
        <div className="ride-details__users__infos">
          <span>{participants.length} Cani Potes</span>
          <button type="button">S'inscrire</button>
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
                    <img src={user} alt="user" /> {/* wait for real photo url */}
                    <span>{participant.participant_first_name}</span>
                  </NavLink>
                  {participant.dogs.map((dog, index) => {
                    if (index < 3) {
                      return (
                        <div className="ride-details__current-user__dogs" key={`${dog.dog_id}`}>
                          <img src={dogPic} alt="dog" /> {/* wait for real photo url */}
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
              <img src={user} alt="user" /> {/* wait for real photo url */}
              <span>{host_first_name}</span>
            </NavLink>
          </div>
        </div>

      </section>

      <button
        type="button"
        className={isChatOpen ? 'ride-details__toggle rotate' : 'ride-details__toggle'}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        <span>^</span>
      </button>

      {isChatOpen && (
        <section className="ride-details__chat">

          <div className="ride-details__messages-container">
            {
              messages.map((msg) => (
                <div
                  key={`${msg.sent}${msg.message}`}
                  className={msg.sender_id === host_id ? 'ride-details__messages-container__message my-message' : 'ride-details__messages-container__message'}
                >
                  <p>{msg.sender_first_name}
                    <span>
                      {new Date(starting_time).toLocaleDateString(undefined, {
                        hour: 'numeric', minute: 'numeric',
                      })}
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
                id="text"
                name="text"
                type="text"
                placeholder="Nouveau message"
                {...register('text', { required: true })}
              />
              <button type="submit">Envoyer</button>
            </form>
          </div>

        </section>
      )}
    </div>
  );
};

export default RideDetails;
