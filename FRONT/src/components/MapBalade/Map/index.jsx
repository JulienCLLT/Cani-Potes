/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import 'leaflet/dist/leaflet.css';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';

// import 'leaflet/dist/leaflet.js';
// import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.js';

// import leaflet
import {
  MapContainer, TileLayer, Marker, Circle, Popup,
} from 'react-leaflet';
import L from 'leaflet';

import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch';

// import composants
// popup informations ride
import RideInformations from '../RideInformations/index';

import './map.scss';
import mapPin from '../../../assets/img/maps-and-flags.svg';
import currentPosition from '../../../assets/img/circle.png';
import { getOneRideById, getRideIsLoading } from '../../../actions/rides';

const Map = () => {
  const apikey = 'AAPKbde72a12e3ff4574b3edd95295b1d13d5-bGBIhj88MhjknVOZZpLcC1yEkpv4yu2Bx8MRWji_av4Hj2aqwc1AsUJ2UyTK3Q';
  const { allRides } = useSelector((state) => state.rides);
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const positionIcon = new L.Icon({
    iconUrl: mapPin,
    inconRetInaUrl: mapPin,
    popupAnchor: [-0, -0], // see what is it
    iconSize: [22, 35],
  });

  const currentPositionIcon = new L.Icon({
    iconUrl: currentPosition,
    inconRetInaUrl: currentPosition,
    popupAnchor: [-0, -0],
    iconSize: [22, 35],
  });

  const fillBlueOptions = { fillColor: 'blue' };

  const handleClick = (e) => {
    const { lat, lng } = e.latlng;
    dispatch(getRideIsLoading());

    const foundRide = allRides.find(
      (ride) => ride.start_coordinate[0] === lat && ride.start_coordinate[1] === lng,
    );

    dispatch(getOneRideById(foundRide.ride_id));
  };

  // const [currentPostion, setCurrentPosition] = useState([]);

  return (
    <MapContainer className="leaflet-container" center={user.position} zoom={15} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Circle center={user.position} pathOptions={fillBlueOptions} radius={1000} />
      <Marker position={user.position}>
        <Popup>
          Votre position
        </Popup>
      </Marker>
      {/* if search alors afficher le marker sur la position recherchée, sinon afficher marker sur la recherche */}
      {/* <Marker position={[currentPostion]}>
        <Popup>
          Votre position recherchée
        </Popup>
      </Marker>; */}

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
        position="topleft"
        useMapBounds={false}
        placeholder="Chercher une adresse ou un endroit"
        providers={{
				  arcgisOnlineProvider: {
				    apikey,
				  },
				  // featureLayerProvider: {
				  //   url: 'https://services.arcgis.com/BG6nSlhZSAWtExvp/ArcGIS/rest/services/GIS_Day_Registration_Form_2019_Hosted_View_Layer/FeatureServer/0',
				  //   searchFields: ['event_name', 'host_organization'],
				  //   label: 'GIS Day Events 2019',
				  //   bufferRadius: 5000,
				  //   formatSuggestion: function (feature) {
				  //     return (
				  //       `${feature.properties.event_name
          //       } - ${
          //         feature.properties.host_organization}`
				  //     );
				  //   },
				  // },
        }}
        eventHandlers={{
				  requeststart: () => console.log('Started request...'),
				  requestend: () => console.log('Ended request...'),
				  results: (results) => {
            console.log([results.latlng.lat, results.latlng.lng]);
            // setCurrentPosition([results.latlng.lat, results.latlng.lng]);
          },
        }}
        key={apikey}
      />
    </MapContainer>
  );
};

export default Map;
