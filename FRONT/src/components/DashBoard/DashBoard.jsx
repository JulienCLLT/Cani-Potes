import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { deleteRide, removeUserFromRide } from '../../actions/rides';

import './dashBoard.scss';

const DashBoard = () => {
    const { profile } = useSelector((state) => state);
    const dispatch = useDispatch();

    return (
        
        <div className="dashboard-page">
            <header className="dashboard-page__header">
                <h1 className="dashboard-title">Tableau de bord</h1>
                <div className="dashboard-avatar">
                    <img src={profile.photo} alt={profile.first_name} />
                </div>
                <span>{profile.first_name} {profile.last_name}</span>
                <NavLink
                    className="create-ride__btn"
                    to="/ride/create"
                    exact
                >
                    Créer une balade
                </NavLink>
                        
            </header>
                <div className="dashboard-info__host">
                    <h2>Je suis l'organisateur d'une ballade</h2>
                    <p>Quelles infos mettre ici ?</p>
                        <NavLink
                        className="ride-nav"
                        to="/ride/:id"
                        exact
                    >
                    Voir la balade
                        </NavLink>
                        
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
                        <span><NavLink
                        className="ride-nav"
                        to="/ride/:id"
                        exact
                        >
                        Voir la balade
                        </NavLink>
                        </span>
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