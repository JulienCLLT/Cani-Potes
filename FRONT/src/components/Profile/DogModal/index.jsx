/* eslint-disable linebreak-style */
import React from 'react';
import { PropTypes } from 'prop-types';

const DogModal = ({
  setIsModalOpen, setDogIsChanged, setisEditingDog, handleUpdateDog
}) => (
  <div className="profile-page__modal__wrapper">
    <div className="profile-page__modal">
      <button
        className="profile-page__modal__close"
        type="button"
        onClick={() => setIsModalOpen(false)}
      >
        ✖
      </button>

      <p>Vous avez des modifications non enregistrées.</p>

      <div className="profile-page__modal__btn">
        <button
          className="profile-page__modal__btn-confirm"
          type="button"
          onClick={() => {
            setIsModalOpen(false);
            setDogIsChanged(false);
            setisEditingDog(0);
          }}
        >
          Quitter
        </button>
        <button
          className="profile-page__modal__btn-danger"
          type="button"
          onClick={handleUpdateDog}
        >
          Enregistrer
        </button>
      </div>
    </div>
  </div>
);

DogModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  setDogIsChanged: PropTypes.func.isRequired,
  setisEditingDog: PropTypes.func.isRequired,
  handleUpdateDog: PropTypes.func.isRequired,
};

export default DogModal;
