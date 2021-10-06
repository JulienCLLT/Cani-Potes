/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteRide, removeUserFromRide } from '../../actions/rides';
import { getRidesWithUserIn } from '../../actions/users';
import { translateDate } from '../../utils/translateDate';

import './dashBoard.scss';

const DashBoard = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRidesWithUserIn());
  }, []);

  const hostedRides = user.rides.filter((ride) => ride.host_id === user.id);
  const notHostedRides = user.rides.filter((ride) => ride.host_id !== user.id);

  return (
    <div className="dashboard">

      <header className="dashboard__header">
        <h1 className="dashboard__header__title">Tableau de bord</h1>
        <span>{user.first_name}</span>

        <Link
          className="dashboard__header__btn"
          to="/ride/create"
        >
          Créer une balade
        </Link>
      </header>

      <section className="dashboard__hostedrides">
        <h2 className="dashboard__hostedrides__title">Je suis l'organisateur de ces balades</h2>

        {
          hostedRides.length > 0 ? (hostedRides.map((ride, index) => (
            <div key={ride.ride_id} className="dashboard__hostedrides__container">
              <div>
                <p>#{index + 1} {ride.title}</p>
                <p>{translateDate(ride.starting_time)}</p>
                <p>
                  {
                    ride.participants ? ride.participants.reduce(
                      (total, item) => item.dogs.length + total, 0,
                    ) : 0
                  }
                  {
                    ride.participants.reduce(
                      (total, item) => item.dogs.length + total, 0,
                    ) > 1 ? ' chiens' : 'chien'
                  }
                </p>
              </div>

              <div className="dashboard__hostedrides__link-container">
                <Link
                  className="dashboard__hostedrides__link"
                  to={`/ride/${ride.ride_id}`}
                >
                  Détails
                </Link>
                <button
                  className="dashboard__hostedrides__link"
                  type="button"
                  onClick={() => dispatch(deleteRide(ride.ride_id))}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))) : (
            <div>Vous n'organisez aucune balade</div>
          )
        }
      </section>

      <section className="dashboard__nothostedrides">
        <h2 className="dashboard__nothostedrides__title">Je participe à ces balades</h2>
        {
          notHostedRides.length > 0 ? (notHostedRides.map((ride, index) => (
            <div key={ride.ride_id} className="dashboard__nothostedrides__container">
              <div>
                <p>#{index + 1} {ride.title}</p>
                <p>{translateDate(ride.starting_time)}</p>
                <p>
                  {
                    ride.participants ? ride.participants.reduce(
                      (total, item) => item.dogs.length + total, 0,
                    ) : 0
                  }
                  {
                    ride.participants.reduce(
                      (total, item) => item.dogs.length + total, 0,
                    ) > 1 ? ' chiens' : 'chien'
                  }
                </p>
              </div>
              <div className="dashboard__nothostedrides__link-container">
                <Link
                  className="dashboard__nothostedrides__link"
                  to={`/ride/${ride.ride_id}`}
                >
                  Détails
                </Link>
                <button
                  className="dashboard__nothostedrides__link"
                  type="button"
                  onClick={() => dispatch(removeUserFromRide(user.id, ride.ride_id))}
                >
                  Quitter
                </button>
              </div>
            </div>
          ))) : (
            <div>Vous ne participez à aucune balade</div>
          )
        }
      </section>
    </div>
  );
};

export default DashBoard;
