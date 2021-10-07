/* eslint-disable linebreak-style */
import React from 'react';
// import close from '../../../assets/img/close.svg';

const DeleteAccModal = ({
  setIsModalAccountOpen, inputDelete, setInputDelete, failedToDelete, handleDeleteAccount, firstName,
}) => (
  <div className="profile-page__modal">
    <div className="profile-page__modal__container">
      <button
        className="profile-page__modal__close"
        type="button"
        onClick={() => setIsModalAccountOpen(false)}
      >
        {/* <img src={close} alt="close" /> */}
        X
      </button>
      <p>ATTENTION, vous êtes sur le point de supprimer votre compte</p>
      <p>Cette action est irréversible</p>
      <p>
        Entrez votre prénom <span>{firstName}</span> pour valider cette action
      </p>
      <input
        type="email"
        name="email"
        value={inputDelete}
        onChange={(e) => setInputDelete(e.target.value)}
      />

      {failedToDelete && (
        <span>Le prénom ne correspond pas</span>
      )}

      <div className="profile-page__modal__btn">
        <button
          type="button"
          onClick={handleDeleteAccount}
        >
          Supprimer mon compte définitivement
        </button>
      </div>
    </div>
  </div>
);

export default DeleteAccModal;
