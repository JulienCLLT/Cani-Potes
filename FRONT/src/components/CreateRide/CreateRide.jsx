/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

// import leaflet
import {
  MapContainer, TileLayer, Marker, useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch';
import * as ELG from 'esri-leaflet-geocoder';
// import { geocodeService } from 'esri-leaflet-geocoder';

import { createRide } from '../../actions/rides';

import './createRide.scss';

import startPointFlag from '../../assets/img/info-ride/startPointFlag.svg';
import endPointFlag from '../../assets/img/info-ride/endPointFlag.svg';

const CreateRide = () => {
  const apikey = 'AAPKbde72a12e3ff4574b3edd95295b1d13d5-bGBIhj88MhjknVOZZpLcC1yEkpv4yu2Bx8MRWji_av4Hj2aqwc1AsUJ2UyTK3Q';
  const { failedToCreateRide, errorMessage } = useSelector((state) => state.rides);
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

  const onSubmit = (data) => {
    console.log(data);
    dispatch(createRide(data, startPoint, endPoint));
  };

  //
  const geocodeService = ELG.geocodeService({
    apikey,
  });
  // console.log(geocodeService);
  // const convert = geocodeService.reverse('51.484463,-0.195405');
  // console.log(convert);

  const LocationMarker = () => {
    const [position, setPosition] = useState(null);
    useMapEvents({
      click(e) {
        if (switchPoint === 'start') {
          setStartPoint([e.latlng.lat, e.latlng.lng]);
        }
        else if (switchPoint === 'end') {
          setEndPoint([e.latlng.lat, e.latlng.lng]);
        }
        geocodeService.reverse().latlng(e.latlng).run((error, result) => {
          if (error) {
            console.log(error);
          }
          console.log(result);
        });
      },
    });
    return position === null ? null : (
      <Marker />
    );
  };
  // console.log(ELG.geocodeService.reverse);

  // Reverse geocoding
  // const geocodeService = L.esri.Geocoding.geocodeService({
  //   apikey,
  // });
  // geocodeService.reverse('51.484463,-0.195405', { // longitude,latitude
  //   maxLocations: 10,
  //   distance: 100,
  // }).then((result) => {
  //   console.log(result);
  // });
  // console.log(L);
  // console.log(ELG);

  return (
    <main className="create-ride">
      <h2>Création d'une balade</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            defaultValue="Ma super balade"
            {...register('title', { required: 'Veuillez écrire un titre.', maxLength: { value: 20, message: 'Veuillez ne pas dépasser 20 caractères.' } })}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </div>

        <div className="create-ride__field__map-container">
          <div className="create-ride__field__map-points">
            <button
              className={switchPoint === 'start' ? 'selected' : ''}
              type="button"
              onClick={() => setSwitchPoint('start')}
            >
              Départ
            </button>
            <button
              className={switchPoint === 'end' ? 'selected' : ''}
              type="button"
              onClick={() => setSwitchPoint('end')}
            >
              Arrivée
            </button>
          </div>
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
				  requeststart: () => console.log('Started request...'),
				  requestend: () => console.log('Ended request...'),
				  results: (results) => {
                  console.log([results.latlng.lat, results.latlng.lng]);
                },
              }}
              key={apikey}
            />
          </MapContainer>
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

        <div className="create-ride__field">
          {/* Start hour */}
          <p>Heure de départ</p>
          <select {...register('startHour', { required: 'Veuillez sélectionner l\'heure de la balade.' })} defaultValue={17}>
            {
							hours.map((hour) => <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}</option>)
						}
          </select>
          {/* Start min */}
          <select {...register('startMin', { required: 'Veuillez sélectionner les minutes de l\'heure de la balade.' })} defaultValue={30}>
            {
							minutes.map((minute) => <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>)
						}
          </select>
          {/* je convertis en number puis je fais si x<minHour alors erreur */}
          {/* {errors.startHour || errors.startMin && <span>{errors.startHour.message}</span> } */}

          {errors.startHour || errors.startMin && (
          <>
            <span>{errors.startHour.message}</span>
            <span>{errors.starMin.message}</span>
          </>
          )}
          {errors.startHour && <span>{errors.startHour.message}</span>}
        </div>

        {/* Duration */}
        <div className="create-ride__field">
          <label htmlFor="duration">Durée de la balade
            <input
              id="duration"
              name="duration"
              defaultValue={15}
              type="number"
              placeholder="Durée (min)"
              {...register('duration', { maxLength: { value: 3, message: 'Veuillez ne pas dépassez 3 chiffres.' } })}
            />
            minutes.
          </label>
          {errors.duration && <span>{errors.duration.message}</span>}
        </div>

        {/* Max dog */}
        <div className="create-ride__field">
          <label htmlFor="maxDogs">Nombre maximum de chiens.</label>
          <input
            id="maxDogs"
            name="maxDogs"
            defaultValue={4}
            type="number"
            {...register('maxDogs', {
              required: 'Veuillez remplir le nombre maximum de chiens', max: { value: 5, message: 'Maximum 5 chiens' }, min: { value: 2, message: 'Minimum 2 chiens' },
            })}
          />
          {errors.maxDogs && <span>{errors.maxDogs.message}</span>}
        </div>

        {/* Description */}
        <div className="create-ride__field">
          <label htmlFor="description">Description de ma balade</label>
          <textarea
            placeholder="Je souhaite me faire des Cani Potes :)"
            {...register('description', { required: 'Veuillez remplir la description.', maxLength: { value: 200, message: 'Veuillez ne pas dépasser 200 caractères.' } })}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </div>

        <input type="submit" />
      </form>
    </main>
  );
};

export default CreateRide;
