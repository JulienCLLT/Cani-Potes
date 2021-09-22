import React from "react";
import { NavLink } from 'react-router-dom';

import './NavBarConnected.scss';


// Desktop NavBar in the header when users are connected
const NavBarConnected = () => {
   
  
  return (
    <nav className="navbar-connected">
      <NavLink
        className="home-link"
        activeClassName="home-link--active"
        to="/home"
        exact
      >
         Map Balade
      </NavLink>

      <NavLink
        className="board-link"
        activeClassName="board-link--active"
        to="/board"
        exact
      >
         Tableau de bord
      </NavLink>
        
      <NavLink
        className="profile-link"
        activeClassName="profile-link--active"
        to="/profile/:id"
        exact
      >
          Profil
      </NavLink>

      <NavLink
        className="signed-out-link"
        to="/"
        exact
      >
          Déconnexion
      </NavLink>
        
    </nav>
  );
};

  
  export default NavBarConnected;
 