/* eslint-disable linebreak-style */
import React from 'react';

const DeleteAccModal = ({
  setIsModalAccountOpen, inputDelete, setInputDelete, failedToDelete, handleDeleteAccount, firstName,
}) => (
  <div className="profile-page__modal__wrapper">
    <div className="profile-page__modal">
      <button
        className="profile-page__modal__close"
        type="button"
        onClick={() => setIsModalAccountOpen(false)}
      >
        ✖
      </button>
      <p className="profile-page__modal__bold">Attention !</p>
      <p>Vous êtes sur le point de supprimer votre compte</p>
      <p>Cette action est irréversible</p>
      <p>
        Entrez votre prénom <span>{firstName}</span> pour valider cette action
      </p>
      <input
        className="profile-page__modal__input"
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
