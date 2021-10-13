/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CreateRideMap from './CreateRideMap';
import { geocodingReverse } from '../../utils/geocodingReverse';
import CreateRideForm from './CreateRideForm';

import './createRide.scss';

const CreateRide = () => {
  const { rideIsCreated } = useSelector((state) => state.rides);
  const { position } = useSelector((state) => state.user);

  const [switchPoint, setSwitchPoint] = useState('start');
  const [startPoint, setStartPoint] = useState(position);
  const [endPoint, setEndPoint] = useState();
  const [startPointAddress, setStartPointAddress] = useState();
  const [endPointAddress, setEndPointAddress] = useState();
  const [searchPosition, setSearchPosition] = useState(position);

  // initial startPointAddress
  geocodingReverse(startPoint, setStartPointAddress);

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

      <CreateRideMap
        switchPoint={switchPoint}
        setStartPoint={setStartPoint}
        setEndPoint={setEndPoint}
        startPoint={startPoint}
        setStartPointAddress={setStartPointAddress}
        setEndPointAddress={setEndPointAddress}
        endPoint={endPoint}
        setSearchPosition={setSearchPosition}
      />

      <CreateRideForm
        startPoint={startPoint}
        endPoint={endPoint}
        switchPoint={switchPoint}
        setSwitchPoint={setSwitchPoint}
        startPointAddress={startPointAddress}
        endPointAddress={endPointAddress}
      />

    </main>
  );
};

export default CreateRide;
