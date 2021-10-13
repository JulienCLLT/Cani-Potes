/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { createRide } from '../../../actions/rides';

const CreateRideForm = ({
  startPoint, endPoint, switchPoint, setSwitchPoint, startPointAddress, endPointAddress,
}) => {
  const dispatch = useDispatch();
  const { failedToCreateRide, errorMessage } = useSelector((state) => state.rides);

  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const date = new Date();

  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
    13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
  ];

  const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    dispatch(createRide(data, startPoint, endPoint));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-ride__form">
      {
        failedToCreateRide && <span>{errorMessage}</span>
      }

      {/* Title */}
      <div className="create-ride__field">
        <label htmlFor="title">Nom de ma balade</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Balade le long du canal"
          {...register('title', { required: 'Veuillez écrire un titre.', maxLength: { value: 30, message: 'Veuillez ne pas dépasser 30 caractères.' } })}
        />
        {errors.title && <span>{errors.title.message}</span>}
      </div>

      {isHelpOpen && (
        <div className="create-ride__help">
          <p className="create-ride__help__msg">
            <button
              className="profile-page__modal__close"
              type="button"
              onClick={() => setIsHelpOpen(false)}
            >
              ✖
            </button>
            Pour définir un point sur la carte
            , appuyer sur le bouton "Adresse de départ" ou "Adresse d'arrivée" puis soit :
            <span>- appuyer sur la carte à l'endroit voulu,</span>
            <span>ou</span>
            <span>- rechercher une adresse depuis la barre de recherche sur la carte.</span>
          </p>
        </div>
      )}

      {/* Start address */}
      <div className="create-ride__field">
        <div className="create-ride__field__map-cta">
          <button
            className={switchPoint === 'start' ? 'selected' : ''}
            type="button"
            onClick={() => setSwitchPoint('start')}
          >
            Adresse de départ
          </button>
          <span className="create-ride__help__btn" onClick={() => setIsHelpOpen(true)}>?</span>
        </div>
        <span>{startPointAddress}</span>
      </div>

      {/* End address */}
      <div className="create-ride__field">
        <div className="create-ride__field__map-cta">
          <button
            className={switchPoint === 'end' ? 'selected' : ''}
            type="button"
            onClick={() => setSwitchPoint('end')}
          >
            Adresse d'arrivée
          </button>
          <span className="create-ride__help__btn" onClick={() => setIsHelpOpen(true)}>?</span>
        </div>
        <span>{endPointAddress}</span>
      </div>

      {/* Date */}
      <div className="create-ride__field">
        <label htmlFor="date">Jour de la balade</label>
        <input
          id="date"
          name="date"
          type="date"
          defaultValue={`${date.getUTCFullYear().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${(date.getUTCDate() + 1).toString().padStart(2, '0')}`}
          min={`${date.getUTCFullYear().toString().padStart(2, '0')}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${date.getUTCDate().toString().padStart(2, '0')}`}
          {...register('date', { required: 'Veuillez sélectionner la date de la balade.' })}
        />
        {errors.date && <span>{errors.date.message}</span>}
      </div>

      {/* Start hour */}
      <div className="create-ride__field">
        <p>Heure de départ</p>
        <div>
          <select {...register('startHour', { required: 'Veuillez sélectionner l\'heure de la balade.' })} defaultValue={17}>
            {hours.map(
              (hour) => <option key={hour} value={hour}>{hour.toString().padStart(2, '0')}h</option>,
            )}
          </select>
          {/* Start min */}
          <select {...register('startMin', { required: 'Veuillez sélectionner les minutes de l\'heure de la balade.' })} defaultValue={30}>
            {minutes.map(
              (minute) => <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>,
            )}
          </select>

          {errors.startHour || errors.startMin && (
          <>
            <span>{errors.startHour.message}</span>
            <span>{errors.starMin.message}</span>
          </>
          )}
          {errors.startHour && <span>{errors.startHour.message}</span>}
        </div>
      </div>

      <div className="create-ride__field-double">
        {/* Duration */}
        <div className="create-ride__field-double__item">
          <label htmlFor="duration">Durée</label>
          <input
            id="duration"
            name="duration"
            type="number"
            placeholder="Durée (min)"
            {...register('duration', { maxLength: { value: 3, message: 'Veuillez ne pas dépassez 3 chiffres.' } })}
          />
        </div>
        {errors.duration && <span>{errors.duration.message}</span>}

        {/* Max dog */}
        <div className="create-ride__field-double__item">
          <label htmlFor="maxDogs">Nombre max de chiens</label>
          <input
            id="maxDogs"
            name="maxDogs"
            type="number"
            placeholder="Nb max de chiens"
            {...register('maxDogs', {
              required: 'Veuillez remplir le nombre maximum de chiens', max: { value: 20, message: 'Maximum 20 chiens' }, min: { value: 2, message: 'Minimum 2 chiens' },
            })}
          />
          {errors.maxDogs && <span>{errors.maxDogs.message}</span>}
        </div>
      </div>

      {/* Description */}
      <div className="create-ride__field">
        <label htmlFor="description">Description de ma balade</label>
        <textarea
          placeholder="Je souhaite me faire des Cani Potes !"
          rows="6"
          {...register('description', { required: 'Veuillez remplir la description.', maxLength: { value: 200, message: 'Veuillez ne pas dépasser 200 caractères.' } })}
        />
        {errors.description && <span>{errors.description.message}</span>}
      </div>

      <input type="submit" className="create-ride__field__submit-btn" />
    </form>
  );
};

CreateRideForm.propTypes = {
  startPoint: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ).isRequired,
  endPoint: PropTypes.arrayOf(
    PropTypes.number,
  ),
  switchPoint: PropTypes.string.isRequired,
  setSwitchPoint: PropTypes.func.isRequired,
  startPointAddress: PropTypes.string.isRequired,
  endPointAddress: PropTypes.string,
};

export default CreateRideForm;
