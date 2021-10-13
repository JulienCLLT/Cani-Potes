/* eslint-disable linebreak-style */
import React from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { kickUserFromRide } from '../../../actions/rides';

const KickUserModal = ({ userKicked, id, setIsKickUserModalOpen, setUserKicked }) => {
  const dispatch = useDispatch();

  const { participants } = useSelector((state) => state.rides.currentRide);

  const handleKick = () => {
    dispatch(kickUserFromRide(userKicked, id));
    setIsKickUserModalOpen(false);
    setUserKicked(0);
  };

  return (
    <>
      <div className="ride-details__modal">
        <button
          type="button"
          className="ride-details__modal__close"
          onClick={() => {
            setIsKickUserModalOpen(false);
            setUserKicked(0);
          }}
        >
          ✖
        </button>
        <p
          className="ride-details__modal__text"
        >
          Voulez allez retirer {
            participants.find(
              (participant) => participant.participant_id === userKicked,
            ).participant_first_name
          } de la balade
        </p>
        <p
          className="ride-details__modal__text"
        >
          Continuer ?
        </p>
        <div className="ride-details__modal__btn-container">
          <button
            type="button"
            className="ride-details__modal__back-btn"
            onClick={() => {
              setIsKickUserModalOpen(false);
              setUserKicked(0);
            }}
          >
            Retour
          </button>
          <button
            type="button"
            className="ride-details__modal__delete-btn"
            onClick={() => handleKick()}
          >
            Retirer
          </button>
        </div>
      </div>
    </>
  );
};

KickUserModal.propTypes = {
  userKicked: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  setIsKickUserModalOpen: PropTypes.func.isRequired,
  setUserKicked: PropTypes.func.isRequired,
};

export default KickUserModal;
