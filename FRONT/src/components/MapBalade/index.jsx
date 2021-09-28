import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Map from './Map/index';
import { getAllRides } from '../../actions/rides';

const MapBalade = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRides());
  }, []);

  return (
    <div className="map-balade">
      <Map />
    </div>
  );
}

export default MapBalade;
