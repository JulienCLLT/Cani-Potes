/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import RideInfo from './RideInfo/index';

import { getOneRideById, getRideIsLoading } from '../../actions/rides';
import { reverseGeocoding } from '../../utils/reverseGeocoding';

import Header from '../Header/Header';
import { reinitRenderAgain } from '../../actions/users';
import RideParticipants from './RideParticipants';
import Chat from './Chat';
import DeleteRideModal from './DeleteRideModal';
import KickUserModal from './KickUserModal';

import './RideDetails.scss';

const RideDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { user: userProfile } = useSelector((state) => state);

  const {
    max_number_dogs, participants, host_id,
    messages, start_coordinate, end_coordinate,
  } = useSelector((state) => state.rides.currentRide);

  const { errorMessage } = useSelector((state) => state.rides);

  messages.sort((a, b) => a.message_id - b.message_id);

  useEffect(() => {
    dispatch(reinitRenderAgain());
    dispatch(getRideIsLoading());
    dispatch(getOneRideById(id));
  }, [userProfile.renderAgain]);

  const [startPointAddress, setStartPointAddress] = useState('');
  const [endPointAddress, setEndPointAddress] = useState('');
  reverseGeocoding(start_coordinate, setStartPointAddress);
  reverseGeocoding(end_coordinate, setEndPointAddress);

  let nbOfDogs = 0;

  participants.map((participant) => nbOfDogs += participant.dogs.length);

  participants.sort((a, b) => {
    if (a.participant_id === host_id) {
      return -1;
    }
    return 0;
  });

  const [isRedirect, setIsRedirect] = useState(false);
  const [isDeleteRideModalOpen, setIsDeleteRideModalOpen] = useState(false);
  const [isKickUserModalOpen, setIsKickUserModalOpen] = useState(false);
  const [userKicked, setUserKicked] = useState(0);

  return (
    <>
      <Header />
      {
        errorMessage === 'Ride not found' ? (
          <div className="ride-details__ride-not-found">Balade non trouvée</div>
        ) : (
          <>
            <main>
              <div className="ride-details">
                {isRedirect && <Redirect to="/home" />}
                <RideInfo
                  start_coordinate={start_coordinate}
                  end_coordinate={end_coordinate}
                  nbOfDogs={nbOfDogs}
                  max_number_dogs={max_number_dogs}
                  nbParticipants={participants.length}
                  startPointAddress={startPointAddress}
                  endPointAddress={endPointAddress}
                />

                <RideParticipants
                  setIsKickUserModalOpen={setIsKickUserModalOpen}
                  setUserKicked={setUserKicked}
                  nbOfDogs={nbOfDogs}
                  setIsDeleteRideModalOpen={setIsDeleteRideModalOpen}
                  id={id}
                />

                <Chat
                  userId={userProfile.id}
                  id={id}
                />

                {isDeleteRideModalOpen && (
                  <DeleteRideModal
                    setIsRedirect={setIsRedirect}
                    setIsDeleteRideModalOpen={setIsDeleteRideModalOpen}
                  />
                )}

                {
                  isKickUserModalOpen && (
                    <KickUserModal
                      userKicked={userKicked}
                      id={id}
                      setIsKickUserModalOpen={setIsKickUserModalOpen}
                      setUserKicked={setUserKicked}
                    />
                  )
                }
              </div>
            </main>
          </>
        )
      }
    </>
  );
};

export default RideDetails;
