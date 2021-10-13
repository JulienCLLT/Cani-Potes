/* eslint-disable linebreak-style */
import React from 'react';
import { PropTypes } from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { loginUser } from '../../../actions/users';

import './connectionModal.scss';

const ConnectionModal = ({ setIsModalOpen }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();

  const { failedToConnect } = useSelector((state) => state.user);

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="connection__modal">
      <button
        className="connection__modal__close"
        type="button"
        onClick={() => setIsModalOpen(false)}
      >
        ✖
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="connection__form">
        <div className="connection__form__field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            {...register('email', { required: true })}
          />
        </div>

        <div className="connection__form__field">
          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            type="password"
            {...register('password', { required: true })}
          />
        </div>

        {
          failedToConnect && (
            <span className="connection__form__failed">Les identifiants sont inexacts.</span>
          )
        }

        <button
          className="connection__form__submit"
          type="submit"
        >
          Se connecter
        </button>

      </form>
    </div>
  );
};

ConnectionModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};

export default ConnectionModal;
