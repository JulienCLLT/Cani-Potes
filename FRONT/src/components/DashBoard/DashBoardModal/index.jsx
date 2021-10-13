/* eslint-disable linebreak-style */
import React from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { deleteRide } from '../../../actions/rides';

const DashBoardModal = ({ setIsModalOpen, isModalopen }) => {
  const dispatch = useDispatch();

  return (
    <div className="dashboard__modal-wrapper">
      <div className="dashboard__modal">
        <button
          className="dashboard__modal__close"
          type="button"
          onClick={() => setIsModalOpen(0)}
        >
          ✖
        </button>

        <p className="dashboard__modal__bold">Attention !</p>
        <p>Vous êtes sur le point de supprimer cette balade.</p>
        <p>Êtes-vous sûr ?</p>

        <button
          className="dashboard__modal__delete"
          type="button"
          onClick={() => dispatch(deleteRide(isModalopen))}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

DashBoardModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  isModalopen: PropTypes.number.isRequired,
};

export default DashBoardModal;
