/* eslint-disable linebreak-style */
import React from 'react';
import { PropTypes } from 'prop-types';

const DogDeleteModal = ({
  setIsModalDeleteDogIsOpen, handleDeleteDog,
}) => (
  <div className="profile-page__modal__wrapper">
    <div className="profile-page__modal">
      <button
        className="profile-page__modal__close"
        type="button"
        onClick={() => setIsModalDeleteDogIsOpen(false)}
      >
        ✖
      </button>

      <p>Supprimer le chien ?</p>

      <div className="profile-page__modal__btn">
        <button
          type="button"
          onClick={() => setIsModalDeleteDogIsOpen(false)}
        >
          Non
        </button>
        <button
          type="button"
          onClick={handleDeleteDog}
        >
          Oui
        </button>
      </div>
    </div>
  </div>
);

DogDeleteModal.propTypes = {
  setIsModalDeleteDogIsOpen: PropTypes.func.isRequired,
  handleDeleteDog: PropTypes.func.isRequired,
};

export default DogDeleteModal;
