/* eslint-disable linebreak-style */
import React from 'react';
import { useSelector } from 'react-redux';

// import leaflet
import {
  MapContainer, TileLayer, Marker, Circle,
} from 'react-leaflet';
import L from 'leaflet';

// import composants
// popup informations ride
import RideInformations from '../RideInformations/index';

import './map.scss';
import mapPin from '../../../assets/img/maps-and-flags.svg';

// requete axios, à chaque coordonnée (point balade), map sur Marker pour qu'ils s'affichent tous
// ne pas oublier la "key" quand map

const Map = () => {
  const lat = 43.5606;
  const lng = 4.085;

  // todo
  const { allRides } = useSelector((state) => state.rides);

  // const getISS = async () => {
  //     const response = await fetch("https://api.wheretheiss.at/v1/satellites/25544");
  //     const data = await response.json();
  //     setLat(data.latitude);
  //     setLng(data.longitude);
  // };
  // setLat(51.766965502);
  // setLng(66.38113382904);

  const positionIcon = new L.Icon({
    iconUrl: mapPin,
    inconRetInaUrl: mapPin,
    popupAnchor: [-0, -0],
    iconSize: [22, 35], // iconSize: [32, 45],
  });

  const fillBlueOptions = { fillColor: 'blue' };
  return (
    <MapContainer className="leaflet-container" center={[lat, lng]} zoom={15} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Circle center={[lat, lng]} pathOptions={fillBlueOptions} radius={1000} />

      {
        allRides.map((ride) => (
          <Marker position={ride.start_coordinate} icon={positionIcon} key={ride.ride_id}>
            <RideInformations ride={ride} />
          </Marker>
        ))
      }
    </MapContainer>
  );
};

export default Map;
