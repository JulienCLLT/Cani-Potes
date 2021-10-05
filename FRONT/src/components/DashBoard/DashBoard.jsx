import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteRide, removeUserFromRide } from '../../actions/rides';
import { getRidesWithUserIn } from '../../actions/users';

import './dashBoard.scss';

const DashBoard = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRidesWithUserIn());
  }, []);

  return (
    <div className="dashboard-page">
      <header className="dashboard-page__header">
        <h1 className="dashboard-title">Tableau de bord</h1>
        <div className="dashboard-avatar">
          <img src={user.photo} alt={user.first_name} />
        </div>
        <span>{user.first_name} {user.last_name}</span>
        <Link
          className="create-ride__btn"
          to="/ride/create"
          exact
        >
          Créer une balade
        </Link>
      </header>
      <div className="dashboard-info__host">
        <h2>Je suis l'organisateur d'une ballade</h2>
        <p>Quelles infos mettre ici ?</p>
        <Link
          className="ride-"
          to="/ride/:id"
          exact
        >
          Voir la balade
        </Link>
        <button
          className="delete-btn"
          type="button"
          onClick={() => dispatch(deleteRide())}
        >
          Supprimer la balade
        </button>
      </div>
      <div className="dashboard-info__participant">
        <h2>Je participe à une ballade</h2>
        <p>Quelles infos mettre ici ?</p>
        <Link
          className="ride-"
          to="/ride/:id"
          exact
        >
          Voir la balade
        </Link>
        <button
          className="remove-btn"
          type="button"
          onClick={() => dispatch(removeUserFromRide())}
        >
          Me retirer de la balade
        </button>
      </div>
    </div>
  );
};

export default DashBoard;
