/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

// import leaflet
import {
  MapContainer, TileLayer, Marker, useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';

// import esri for geocoding
import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch';
import { geocodeService } from 'esri-leaflet-geocoder';
import { apikey } from '../../utils/arcGiskey';

import { createRide } from '../../actions/rides';

import './createRide.scss';

import startPointFlag from '../../assets/img/info-ride/startPointFlag.svg';
import endPointFlag from '../../assets/img/info-ride/endPointFlag.svg';

const CreateRide = () => {
  const { failedToCreateRide, errorMessage, rideIsCreated } = useSelector((state) => state.rides);
  const { user } = useSelector((state) => state);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const dispatch = useDispatch();

  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  ];

  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  const date = new Date();

  const positionStart = new L.Icon({
    iconUrl: startPointFlag,
    inconRetInaUrl: startPointFlag,
    popupAnchor: [-0, -0],
    iconSize: [45, 55],
  });

  const positionEnd = new L.Icon({
    iconUrl: endPointFlag,
    inconRetInaUrl: endPointFlag,
    popupAnchor: [-0, -0],
    iconSize: [45, 55],
  });

  const [switchPoint, setSwitchPoint] = useState('start');
  const [startPoint, setStartPoint] = useState(user.position);
  const [endPoint, setEndPoint] = useState();
  const [startPointAddress, setStartPointAddress] = useState();
  const [endPointAddress, setEndPointAddress] = useState();
  const [searchPosition, setSearchPosition] = useState(user.position);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const onSubmit = (data) => {
    if (!startPoint || !endPoint) {
      console.warn('Invalid start or end point for ride');
    }
    dispatch(createRide(data, startPoint, endPoint));
  };

  const geocodeServiceEsri = geocodeService({
    apikey,
  });

  // reverse geocoding : convert lat and lng to address
  const geocodingReverse = (latlng, useStatepointAddress) => {
    geocodeServiceEsri.reverse().latlng(latlng)
      .run((error, result) => {
        if (error) {
          console.log('reverse geocoding error', error);
        }
        useStatepointAddress(result.address.LongLabel);
      });
  };

  // initial startPointAddress
  geocodingReverse(startPoint, setStartPointAddress);

  const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    useMapEvents({
      click(e) {
        if (switchPoint === 'start') {
          setStartPoint([e.latlng.lat, e.latlng.lng]);
          geocodingReverse(startPoint, setStartPointAddress);
        }
        else if (switchPoint === 'end') {
          setEndPoint([e.latlng.lat, e.latlng.lng]);
          geocodingReverse([e.latlng.lat, e.latlng.lng], setEndPointAddress);
        }
      },
    });
    return position === null ? null : (
      <Marker />
    );
  };

  useEffect(() => {
    if (switchPoint === 'start') {
      setStartPoint(searchPosition);
      geocodingReverse(searchPosition, setStartPointAddress);
    }
    else {
      setEndPoint(searchPosition);
      geocodingReverse(searchPosition, setEndPointAddress);
    }
  }, [searchPosition]);

  return (
    <main className="create-ride">
      {rideIsCreated && <Redirect to="/board" />}
      <div className="create-ride__map-wrapper">
        <MapContainer className="leaflet-container" center={user.position} zoom={16} scrollWheelZoom>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker
            position={startPoint}
            icon={positionStart}
          />
          {endPoint && (
            <Marker
              position={endPoint}
              icon={positionEnd}
            />
          )}
          <LocationMarker />
          <EsriLeafletGeoSearch
            position="topleft"
            useMapBounds={false}
            placeholder="Chercher une adresse ou un endroit"
            providers={{
              arcgisOnlineProvider: {
                apikey,
              },
            }}
            eventHandlers={{
              results: (results) => {
                console.log('EsriLeafletGeosearch', [results.latlng.lat, results.latlng.lng]);
                setSearchPosition([results.latlng.lat, results.latlng.lng]);
              },
            }}
            key={apikey}
          />
        </MapContainer>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="create-ride__form">
        {
          failedToCreateRide && <span>{errorMessage}</span>
        }

        {/* Title */}
        <div className="create-ride__field">
          <label htmlFor="title">Nom de ma balade</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Balade le long du canal"
            {...register('title', { required: 'Veuillez écrire un titre.', maxLength: { value: 30, message: 'Veuillez ne pas dépasser 30 caractères.' } })}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        {isHelpOpen && (
          <div className="create-ride__help">
            <p className="create-ride__help__msg">
              <button
                className="profile-page__modal__close"
                type="button"
                onClick={() => setIsHelpOpen(false)}
              >
                ✖
              </button>
              Pour définir un point sur la carte pour votre balade
              , choisissez "Adresse de départ" ou "Adresse d'arrivée" puis soit :
              <span>appuyez sur la carte à l'endroit voulu,</span>
              <span>soit recherchez votre adresse depuis la barre de recherche sur la carte</span>
            </p>
          </div>
        )}

        {/* Start address */}
        <div className="create-ride__field">
          <div className="create-ride__field__map-cta">
            <button
              className={switchPoint === 'start' ? 'selected' : ''}
              type="button"
              onClick={() => setSwitchPoint('start')}
            >
              Adresse de départ
            </button>
            <span className="create-ride__help__btn" onClick={() => setIsHelpOpen(true)}>?</span>
          </div>
          <span>{startPointAddress}</span>
        </div>

        {/* End address */}
        <div className="create-ride__field">
          <div className="create-ride__field__map-cta">
            <button
              className={switchPoint === 'end' ? 'selected' : ''}
              type="button"
              onClick={() => setSwitchPoint('end')}
            >
              Adresse d'arrivée
            </button>
            <span className="create-ride__help__btn" onClick={() => setIsHelpOpen(true)}>?</span>
          </div>
          <span>{endPointAddress}</span>
        </div>

        {/* Date */}
        <div className="create-ride__field">
          <label htmlFor="date">Jour de la balade</label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={`${date.getUTCFullYear().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${(date.getUTCDate() + 1).toString().padStart(2, '0')}`}
            min={`${date.getUTCFullYear().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`}
            {...register('date', { required: 'Veuillez sélectionner la date de la balade.' })}
          />
          {errors.date && <span>{errors.date.message}</span>}
        </div>

        {/* Start hour */}
        <div className="create-ride__field">
          <p>Heure de départ</p>
          <div>
            <select {...register('startHour', { required: 'Veuillez sélectionner l\'heure de la balade.' })} defaultValue={17}>
              {hours.map(
                (hour) => <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}</option>,
              )}
            </select>
            {/* Start min */}
            <select {...register('startMin', { required: 'Veuillez sélectionner les minutes de l\'heure de la balade.' })} defaultValue={30}>
              {minutes.map(
                (minute) => <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>,
              )}
            </select>

            {errors.startHour || errors.startMin && (
            <>
              <span>{errors.startHour.message}</span>
              <span>{errors.starMin.message}</span>
            </>
            )}
            {errors.startHour && <span>{errors.startHour.message}</span>}
          </div>
        </div>

        <div className="create-ride__field-double">
          {/* Duration */}
          <div className="create-ride__field-double__item">
            <p>Durée</p>
            <input
              id="duration"
              name="duration"
              type="number"
              placeholder="Durée (min)"
              {...register('duration', { maxLength: { value: 3, message: 'Veuillez ne pas dépassez 3 chiffres.' } })}
            />
          </div>
          {errors.duration && <span>{errors.duration.message}</span>}

          {/* Max dog */}
          <div className="create-ride__field-double__item">
            <label htmlFor="maxDogs">Nombre max de chiens</label>
            <input
              id="maxDogs"
              name="maxDogs"
              type="number"
              placeholder="Nb max de chiens"
              {...register('maxDogs', {
                required: 'Veuillez remplir le nombre maximum de chiens', max: { value: 20, message: 'Maximum 20 chiens' }, min: { value: 2, message: 'Minimum 2 chiens' },
              })}
            />
            {errors.maxDogs && <span>{errors.maxDogs.message}</span>}
          </div>
        </div>

        {/* Description */}
        <div className="create-ride__field">
          <label htmlFor="description">Description de ma balade</label>
          <textarea
            placeholder="Je souhaite me faire des Cani Potes !"
            rows="6"
            {...register('description', { required: 'Veuillez remplir la description.', maxLength: { value: 200, message: 'Veuillez ne pas dépasser 200 caractères.' } })}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <input type="submit" className="create-ride__field__submit-btn" />
      </form>
    </main>
  );
};

export default CreateRide;
