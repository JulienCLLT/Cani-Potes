/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteRide, userQuitRide } from '../../actions/rides';
import { getRidesWithUserIn, reinitRenderAgain } from '../../actions/users';
import { translateDate } from '../../utils/translateDate';

import './dashBoard.scss';

const DashBoard = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reinitRenderAgain());
    dispatch(getRidesWithUserIn());
  }, [user.renderAgain]);

  const hostedRides = user.rides.filter((ride) => ride.host_id === user.id);
  const notHostedRides = user.rides.filter((ride) => ride.host_id !== user.id);

  return (
    <div className="dashboard">

      <header className="dashboard__header">

        <Link
          className="dashboard__header__btn"
          to="/ride/create"
        >
          Créer une balade
        </Link>
      </header>
      <div className="dashboard__rides">
        <section className="dashboard__hostedrides">
          <h2 className="dashboard__hostedrides__title">Je suis l'organisateur de ces balades</h2>

          <div className="dashboard__hostedrides__block">
            {
            hostedRides.length > 0 ? (hostedRides.map((ride, index) => (
              <div key={ride.id} className="dashboard__hostedrides__container">
                <div>
                  <p className="dashboard__hostedrides__name">#{index + 1} {ride.title}</p>
                  <p>{translateDate(ride.starting_time)}</p>
                  <p>
                    {
                      ride.dogs_enrolled ? `${ride.dogs_enrolled.length} ` : '0 '
                    }
                    chien{ride.dogs_enrolled && ride.dogs_enrolled.length > 1 ? 's' : null}
                  </p>
                </div>

                <div className="dashboard__hostedrides__link-container">
                  <Link
                    className="dashboard__hostedrides__link link-details"
                    to={`/ride/${ride.id}`}
                  >
                    Détails
                  </Link>
                  <button
                    className="dashboard__hostedrides__link link-delete"
                    type="button"
                    onClick={() => dispatch(deleteRide(ride.id))}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))) : (
              <div>Vous n'organisez aucune balade</div>
            )
          }
          </div>
        </section>

        <div className="dashboard__linebreak" />

        <section className="dashboard__nothostedrides">
          <h2 className="dashboard__nothostedrides__title">Je participe à ces balades</h2>

          <div className="dashboard__nothostedrides__block">
            {
            notHostedRides.length > 0 ? (notHostedRides.map((ride, index) => (
              <div key={ride.id} className="dashboard__nothostedrides__container">
                <div>
                  <p className="dashboard__nothostedrides__name">#{index + 1} {ride.title}</p>
                  <p>{translateDate(ride.starting_time)}</p>
                  <p>
                    {
                      ride.dogs_enrolled ? `${ride.dogs_enrolled.length} ` : '0 '
                    }
                    chien{ride.dogs_enrolled && ride.dogs_enrolled.length > 1 ? 's' : null}
                  </p>
                </div>
                <div className="dashboard__nothostedrides__link-container">
                  <Link
                    className="dashboard__nothostedrides__link link-details"
                    to={`/ride/${ride.id}`}
                  >
                    Détails
                  </Link>
                  <button
                    className="dashboard__nothostedrides__link link-delete"
                    type="button"
                    onClick={() => {
                      dispatch(userQuitRide(user.id, ride.id));
                    }}
                  >
                    Quitter
                  </button>
                </div>
              </div>
            ))) : (
              <div>Vous ne participez à aucune balade dont vous n'êtes pas l'organisateur.</div>
            )
          }
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashBoard;
