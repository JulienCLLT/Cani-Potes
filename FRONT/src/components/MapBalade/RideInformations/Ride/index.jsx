/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

import { reverseGeocoding } from '../../../../utils/reverseGeocoding';

// import images
import calendar from '../../../../assets/img/info-ride/calendar.svg';
import clock from '../../../../assets/img/info-ride/hourglass.svg';
import starting from '../../../../assets/img/info-ride/map-pin.svg';
import end from '../../../../assets/img/info-ride/flag.svg';

import { translateDate } from '../../../../utils/translateDate';
// import css
import './ride.scss';

const Ride = ({ starting_time, duration, start_coordinate, end_coordinate }) => {
  const [startPointAddress, setStartPointAddress] = useState('');
  const [endPointAddress, setEndPointAddress] = useState('');

  reverseGeocoding(start_coordinate, setStartPointAddress);
  reverseGeocoding(end_coordinate, setEndPointAddress);

  return (
    <div className="ride">
      <p className="ride__detail"><img src={calendar} alt="calendar" />{translateDate(starting_time)}</p>
      <p className="ride__detail"><img className="icon" src={clock} alt="clock" />{duration.minutes ? `${duration.minutes} minutes` : 'Durée non précisée'}</p>
      <p className="ride__detail"><img className="icon" src={starting} alt="starting" />Départ : {startPointAddress}</p>
      <p className="ride__detail"><img className="icon" src={end} alt="arrival" />Arrivée : {endPointAddress}</p>
    </div>
  );
};

Ride.propTypes = {
  starting_time: PropTypes.string.isRequired,
  duration: PropTypes.shape({
    minutes: PropTypes.number.isRequired,
  }).isRequired,
  start_coordinate: PropTypes.arrayOf(PropTypes.number).isRequired,
  end_coordinate: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Ride;
