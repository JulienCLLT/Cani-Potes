/* eslint-disable linebreak-style */
import React from 'react';
import { PropTypes } from 'prop-types';
import { useSelector } from 'react-redux';

import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import L from 'leaflet';

import Loader from '../../Loader/index';

import { translateDate } from '../../../utils/translateDate';

import calendar from '../../../assets/img/info-ride/calendar-blue.svg';
import hourglass from '../../../assets/img/info-ride/hourglass-orange.svg';
import flag from '../../../assets/img/info-ride/flag-green.svg';
import starting from '../../../assets/img/info-ride/map-pin-red.svg';
import nbdog from '../../../assets/img/info-ride/nbdog.svg';
import nbcanipote from '../../../assets/img/info-ride/nbcanipote.svg';
import startFlag from '../../../assets/img/info-ride/startPointFlag.svg';
import endFlag from '../../../assets/img/info-ride/endPointFlag.svg';

import './rideInfo.scss';

const RideInfo = ({
  start_coordinate, end_coordinate, nbOfDogs, max_number_dogs,
  nbParticipants, startPointAddress, endPointAddress,
}) => {
  const {
    title, starting_time, duration, description, isLoading,
  } = useSelector((state) => state.rides.currentRide);

  const positionStart = new L.Icon({
    iconUrl: startFlag,
    inconRetInaUrl: startFlag,
    popupAnchor: [-0, -0],
    iconSize: [35, 42],
  });

  const positionEnd = new L.Icon({
    iconUrl: endFlag,
    inconRetInaUrl: endFlag,
    popupAnchor: [-0, -0],
    iconSize: [35, 42],
  });

  return (
    <>
      <section className="ride-details__map">
        <div className="ride-details__leaflet">
          {
              isLoading ? (
                <Loader />
              ) : (
                <MapContainer className="ride-details__leaflet__map" center={start_coordinate} zoom={16} scrollWheelZoom zoomControl={false}>
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={start_coordinate} icon={positionStart}>
                    <Popup>Départ</Popup>
                  </Marker>
                  <Marker position={end_coordinate} icon={positionEnd}>
                    <Popup>Arrivée</Popup>
                  </Marker>
                </MapContainer>
              )
            }
        </div>
      </section>

      <section className="ride-details__infos">
        <div className="ride-details__infos__header">
          <h2>{title}</h2>
          <div className="ride-details__infos__header__number">
            <span>
              <img src={nbdog} alt="icon dog" />
              {nbOfDogs} / {max_number_dogs} chiens
            </span>
            <span>
              <img src={nbcanipote} alt="icon human" />
              {nbParticipants} Cani Potes
            </span>
          </div>
        </div>
        <div className="ride-details__infos__description">
          <p>
            <span className="ride-details__icon"><img src={calendar} alt="calendar" /></span>
            {translateDate(starting_time)}
          </p>
          <p>
            <span className="ride-details__icon"><img src={hourglass} alt="hourglass" /></span>
            Durée : {duration.minutes ? `${duration.minutes} min` : 'indeterminée'}
          </p>
          <p>
            <span className="ride-details__icon"><img src={starting} alt="starting" /></span>
            Départ : <br />{startPointAddress}
          </p>
          <p>
            <span className="ride-details__icon"><img src={flag} alt="flag" /></span>
            Arrivée : <br />{endPointAddress}
          </p>
          <p>{description}</p>
        </div>
      </section>
    </>
  );
};

RideInfo.propTypes = {
  start_coordinate: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ).isRequired,
  end_coordinate: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ).isRequired,
  nbOfDogs: PropTypes.number.isRequired,
  max_number_dogs: PropTypes.number.isRequired,
  nbParticipants: PropTypes.number.isRequired,
  startPointAddress: PropTypes.string.isRequired,
  endPointAddress: PropTypes.string.isRequired,
};

export default RideInfo;
