import React from 'react';
import PropTypes from 'prop-types';
import { Popup } from 'react-leaflet';
import Ride from './Ride/index';
import Profile from './Profile/index';

// import images
import rideImage from '../../../assets/img/info-ride/dog-walk.svg';

// import css
import './ride-informations.scss';

const RideInformations = ({ride}) => (
  <Popup className="ride-informations">
    <h1><img className="icon" src={rideImage} alt="clock" />{ride.title}</h1>
    <div className="ride-informations__all">
      <Ride {...ride} />
      <Profile {...ride} />
    </div>
  </Popup>
);

RideInformations.propTypes = {
  ride: PropTypes.shape({
    ride_id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    start_coordinate: PropTypes.arrayOf(PropTypes.number).isRequired,
    end_coordinate: PropTypes.arrayOf(PropTypes.number).isRequired,
    starting_time: PropTypes.string.isRequired,
    duration: PropTypes.shape({
      minutes: PropTypes.number.isRequired,
    }).isRequired,
    max_number_dos: PropTypes.number.isRequired,
    tag_label: PropTypes.string.isRequired,
    host_id: PropTypes.number.isRequired,
    host_first_name: PropTypes.string.isRequired,
    messages: PropTypes.shape({
      sent: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      sender_id: PropTypes.number.isRequired,
      message_id: PropTypes.number.isRequired,
      sender_photo: PropTypes.string.isRequired,
      sender_last_name: PropTypes.string.isRequired,
      sender_first_name: PropTypes.string.isRequired,
    }).isRequired,
    participants: PropTypes.arrayOf(
      PropTypes.shape({
        dogs: PropTypes.arrayOf(
          PropTypes.shape({
            dog_id: PropTypes.number.isRequired,
            dog_photo: PropTypes.string.isRequired,
            dog_surname: PropTypes.string.isRequired,
            dog_photo_id: PropTypes.number.isRequired
          }),
        ).isRequired,
        participant_id: PropTypes.number.isRequired,
        participant_photo: PropTypes.string,
        participant_last_name: PropTypes.string.isRequired,
        participant_first_name: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default RideInformations;
