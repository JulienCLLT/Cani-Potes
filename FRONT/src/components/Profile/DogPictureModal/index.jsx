/* eslint-disable linebreak-style */
import React from 'react';
import { PropTypes } from 'prop-types';

const DogPictureModal = ({
  setIsModalPhotoOpen, handleDeletePhoto,
}) => (
  <div className="profile-page__modal__wrapper">
    <div className="profile-page__modal">
      <button
        className="profile-page__modal__close"
        type="button"
        onClick={() => setIsModalPhotoOpen(false)}
      >
        ✖
      </button>

      <p>Supprimer la photo ?</p>

      <div className="profile-page__modal__btn">
        <button
          type="button"
          onClick={() => setIsModalPhotoOpen(false)}
        >
          Non
        </button>
        <button
          type="button"
          onClick={handleDeletePhoto}
        >
          Oui
        </button>
      </div>
    </div>
  </div>
);

DogPictureModal.propTypes = {
  setIsModalPhotoOpen: PropTypes.func.isRequired,
  handleDeletePhoto: PropTypes.func.isRequired,
};

export default DogPictureModal;
