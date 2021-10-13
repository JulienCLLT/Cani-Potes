/* eslint-disable linebreak-style */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropTypes } from 'prop-types';
import { deleteRide } from '../../../actions/rides';

const DeleteRideModal = ({ setIsRedirect, setIsDeleteRideModalOpen }) => {
  const dispatch = useDispatch();
  const { ride_id } = useSelector((state) => state.rides.currentRide);

  const handleDelete = () => {
    dispatch(deleteRide(ride_id));
    setIsDeleteRideModalOpen(false);
    setIsRedirect(true);
  };

  return (
    <div className="ride-details__modal-wrapper">
      <div className="ride-details__modal">
        <button
          type="button"
          className="ride-details__modal__close"
          onClick={() => setIsDeleteRideModalOpen(false)}
        >
          ✖
        </button>
        <p className="ride-details__modal__bold">Attention !</p>
        <p className="ride-details__modal__text">
          Vous êtes l'organisateur de cette balade.
        </p>
        <p className="ride-details__modal__text">
          En vous retirant vous la supprimerez.
        </p>
        <p className="ride-details__modal__text">
          Continuer ?
        </p>
        <div className="ride-details__modal__btn-container">
          <button
            type="button"
            className="ride-details__modal__back-btn"
            onClick={() => setIsDeleteRideModalOpen(false)}
          >
            Retour
          </button>
          <button
            type="button"
            className="ride-details__modal__delete-btn"
            onClick={() => handleDelete()}
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteRideModal.propTypes = {
  setIsRedirect: PropTypes.func.isRequired,
  setIsDeleteRideModalOpen: PropTypes.func.isRequired,
};

export default DeleteRideModal;
