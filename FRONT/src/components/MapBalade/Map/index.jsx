/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// import leaflet
import {
  MapContainer, TileLayer, Marker, Circle, ZoomControl,
} from 'react-leaflet';
import L from 'leaflet';

import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch';

// import composants popup informations ride
import RideInformations from '../RideInformations/index';

import mapPin from '../../../assets/img/maps-and-flags.svg';
import { getOneRideById, getRideIsLoading } from '../../../actions/rides';

import 'leaflet/dist/leaflet.css';
// import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';

import './map.scss';

const Map = () => {
  const apikey = 'AAPKbde72a12e3ff4574b3edd95295b1d13d5-bGBIhj88MhjknVOZZpLcC1yEkpv4yu2Bx8MRWji_av4Hj2aqwc1AsUJ2UyTK3Q';
  const { allRides } = useSelector((state) => state.rides);
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const positionIcon = new L.Icon({
    iconUrl: mapPin,
    inconRetInaUrl: mapPin,
    popupAnchor: [-0, -0],
    iconSize: [22, 35],
  });

  const fillBlueOptions = {
    fillColor: '#fc575e',
    fillOpacity: 0.15,
    color: '#fc575e',
  };

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    dispatch(getRideIsLoading());

    const foundRide = allRides.find(
      (ride) => ride.start_coordinate[0] === lat && ride.start_coordinate[1] === lng,
    );

    dispatch(getOneRideById(foundRide.ride_id));
  };

  const [currentPosition, setCurrentPosition] = useState();

  return (
    <MapContainer
      className="leaflet-container"
      center={user.position}
      zoom={15}
      zoomControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ZoomControl position="topright" />
      <Circle
        center={currentPosition || user.position}
        pathOptions={fillBlueOptions}
        radius={1000}
      />

      {
        currentPosition ? (
          <Marker position={currentPosition} />
        ) : (
          <Marker position={user.position} />
        )
      }

      {
        allRides.map((ride) => (
          <Marker
            position={ride.start_coordinate}
            icon={positionIcon}
            key={ride.ride_id}
            eventHandlers={{ click: handleClick }}
          >
            <RideInformations />
          </Marker>
        ))
      }

      <EsriLeafletGeoSearch
        position="topright"
        useMapBounds={false}
        placeholder="Chercher une adresse ou un endroit"
        providers={{
          arcgisOnlineProvider: {
            apikey,
          },
        }}
        eventHandlers={{
          results: (results) => {
            setCurrentPosition([results.latlng.lat, results.latlng.lng]);
          },
        }}
        key={apikey}
      />
    </MapContainer>
  );
};

export default Map;
