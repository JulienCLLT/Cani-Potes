/* eslint-disable linebreak-style */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
import { getOneRideById, getRideIsLoading } from '../../../actions/rides';

const Map = () => {
  const { allRides } = useSelector((state) => state.rides);
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const positionIcon = new L.Icon({
    iconUrl: mapPin,
    inconRetInaUrl: mapPin,
    popupAnchor: [-0, -0],
    iconSize: [22, 35], // iconSize: [32, 45],
  });

  const fillBlueOptions = { fillColor: 'blue' };

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    dispatch(getRideIsLoading());

    const foundRide = allRides.find((ride) =>
      ride.start_coordinate[0] === lat && ride.start_coordinate[1] === lng,
    );

    dispatch(getOneRideById(foundRide.ride_id));
  };

  return (
    <MapContainer className="leaflet-container" center={user.position} zoom={15} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Circle center={user.position} pathOptions={fillBlueOptions} radius={1000} />

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

    </MapContainer>
  );
};

export default Map;
