/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';

// import leaflet
import {
  MapContainer, TileLayer, Marker, useMapEvents,
} from 'react-leaflet';
import L from 'leaflet';
import EsriLeafletGeoSearch from 'react-esri-leaflet/plugins/EsriLeafletGeoSearch';

import { apikey } from '../../../utils/arcGiskey';

import startPointFlag from '../../../assets/img/info-ride/startPointFlag.svg';
import endPointFlag from '../../../assets/img/info-ride/endPointFlag.svg';
import { geocodingReverse } from '../../../utils/geocodingReverse';

const CreateRideMap = ({
  switchPoint, setStartPoint, setEndPoint, startPoint, setStartPointAddress,
  setEndPointAddress, endPoint, setSearchPosition,
}) => {
  const { position } = useSelector((state) => state.user);

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

  return (
    <div className="create-ride__map-wrapper">
      <MapContainer className="leaflet-container" center={position} zoom={16} scrollWheelZoom>
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
              setSearchPosition([results.latlng.lat, results.latlng.lng]);
            },
          }}
          key={apikey}
        />
      </MapContainer>
    </div>
  );
};

CreateRideMap.propTypes = {
  switchPoint: PropTypes.string.isRequired,
  setStartPoint: PropTypes.func.isRequired,
  setEndPoint: PropTypes.func.isRequired,
  startPoint: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ).isRequired,
  setStartPointAddress: PropTypes.func.isRequired,
  setEndPointAddress: PropTypes.func.isRequired,
  endPoint: PropTypes.arrayOf(
    PropTypes.number,
  ),
  setSearchPosition: PropTypes.func.isRequired,
};

export default CreateRideMap;
