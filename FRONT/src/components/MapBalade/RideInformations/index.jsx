import React from 'react';
import { Popup } from 'react-leaflet';
import Ride from './Ride/index';
import Profile from './Profile/index';

// import images
import ride from '../../../assets/img/info-ride/dog-walk.svg';

// import css
import './ride-informations.scss';

const RideInformations = () => (
  <Popup className="ride-informations">
    <h1><img className="icon" src={ride} alt="clock" />Nom de la balade</h1>
    <div className="ride-informations__all">
      <Ride />
      <Profile />
    </div>
  </Popup>
);

export default RideInformations;
