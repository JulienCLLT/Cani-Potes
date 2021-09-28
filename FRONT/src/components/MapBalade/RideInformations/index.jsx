import React from 'react';
import { Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';

import Ride from './Ride/index';
import Profile from './Profile/index';

// import images
import rideImage from '../../../assets/img/info-ride/dog-walk.svg';

// import css
import './ride-informations.scss';

const RideInformations = () => {
  const { currentRide } = useSelector((state) => state.rides);

  return (
    <Popup className="ride-informations">
      <h1><img className="icon" src={rideImage} alt="clock" />{currentRide.title}</h1>
      <div className="ride-informations__all">
        {
          currentRide.isLoading ? (
            <span>Chargement en cours</span>
          ) : (
            <>
              <Ride {...currentRide} />
              <Profile {...currentRide} />
            </>
          )
        }
      </div>
    </Popup>
  )
};

export default RideInformations;
