/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';
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

  console.log(hostedRides);
  console.log(notHostedRides);

  return (
    <div className="dashboard-page">

      <header className="dashboard-page__header">
        <h1 className="dashboard-title">Tableau de bord</h1>
        <span>{user.first_name}</span>
        <Link
          className="create-ride__btn"
          to="/ride/create"
        >
          Créer une balade
        </Link>
      </header>

      <section className="dashboard-info__host">
        <h2>Je suis l'organisateur de ces balades</h2>

        {
          hostedRides.length > 0 ? (hostedRides.map((ride, index) => (
            <div key={ride.ride_id}>
              <div>
                <p>#{index + 1} {ride.title} - {translateDate(ride.starting_time)}</p>
                <p>
                  {/* {
                    ride.participants ? ride.participants.reduce(
                      (a, b) => a.dogs[0] + b.dogs[0],
                    ) : 0
                  } / {ride.max_number_dogs} chiens */}
                </p>
              </div>
              <div>
                <Link
                  className="ride-"
                  to={`/ride/${ride.ride_id}`}
                >
                  Voir la balade
                </Link>
                <button
                  className="delete-btn"
                  type="button"
                  onClick={() => dispatch(deleteRide(ride.ride_id))}
                >
                  Supprimer la balade
                </button>
              </div>
            </div>
          ))) : (
            <div>Vous n'organisez aucune balade</div>
          )
        }
      </section>

      <section className="dashboard-info__participant">
        <h2>Je participe à ces balades</h2>
        {
          notHostedRides.length > 0 ? (notHostedRides.map((ride, index) => (
            <div key={ride.ride_id}>
              <div>
                <p>#{index + 1} {ride.title} - {translateDate(ride.starting_time)}</p>
                <p>
                  {/* {
                    ride.participants ? ride.participants.reduce(
                      (a, b) => a.dogs.length + (b.dogs.length || 0),
                    ) : '0'
                  } / {ride.max_number_dogs} chiens */}
                </p>
              </div>
              <div>
                <Link
                  className="ride-"
                  to={`/ride/${ride.ride_id}`}
                >
                  Voir la balade
                </Link>
                <button
                  className="remove-btn"
                  type="button"
                  onClick={() => dispatch(removeUserFromRide(user.id, ride.ride_id))}
                >
                  Me retirer de la balade
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
