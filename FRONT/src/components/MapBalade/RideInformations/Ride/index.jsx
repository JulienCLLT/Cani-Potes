import React from 'react';
import { NavLink } from 'react-router-dom';
import { PropTypes } from 'prop-types';

// import images
import calendar from '../../../../assets/img/info-ride/calendar.svg';
import clock from '../../../../assets/img/info-ride/hourglass.svg';
import starting from '../../../../assets/img/info-ride/map-pin.svg';
import end from '../../../../assets/img/info-ride/flag.svg';

// import css
import './ride.scss';

const Ride = ({ ride_id, starting_time, duration, start_coordinate, end_coordinate }) => (
  <div className="ride">
    <p className="ride__detail"><img src={calendar} alt="calendar" />{starting_time}</p>
    <p className="ride__detail"><img className="icon" src={clock} alt="clock" />{duration.minutes} minutes - 1km</p>
    <p className="ride__detail"><img className="icon" src={starting} alt="starting" />Départ : {start_coordinate}</p>
    <p className="ride__detail"><img className="icon" src={end} alt="arrival" />Arrivée : {end_coordinate}</p>
    <NavLink exact to={`/ride/${ride_id}`}>
      <button type="button">En savoir plus</button>
    </NavLink>
  </div>
);

Ride.propTypes = {
  ride_id: PropTypes.number.isRequired,
  starting_time: PropTypes.string.isRequired,
  duration: PropTypes.shape({
    minutes: PropTypes.number.isRequired,
  }).isRequired,
  start_coordinate: PropTypes.arrayOf(PropTypes.number).isRequired,
  end_coordinate: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default Ride;
