import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Map from './Map/index';
import { getAllRides } from '../../actions/rides';
import { userGetsHisDogs } from '../../actions/users';

const MapBalade = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getAllRides());
    dispatch(userGetsHisDogs(id));
  }, []);

  return (
    <div className="map-balade">
      <Map />
    </div>
  );
};

export default MapBalade;
