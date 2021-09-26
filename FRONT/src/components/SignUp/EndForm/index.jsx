/* eslint-disable linebreak-style */
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { previousSignupFormStep } from '../../../actions/signup';

import happy from '../../../assets/img/sunglasses.svg';

import './end-form.scss';

const EndForm = () => {
  const formStep = useSelector((state) => state.signup.formStep);
  const dispatch = useDispatch();
  const clickToPrevious = () => {
    dispatch(previousSignupFormStep());
  };

  return (
    <div className={formStep === 3 ? 'signup end' : 'hidden'}>
      <h2>Fin</h2>
      <div className="end__content">
        <div className="end__content__p">
          <p>Ca y est, tout est prêt !</p>
          <p>Tu peux enfin trouver les balades près de chez toi <img src={happy} alt="happy smiley" /></p>
        </div>
        <button type="submit" className="end__content__submit">Chercher une balade</button>
      </div>
      <button onClick={clickToPrevious} type="button" className="signup__back-submit__back end__back">Retour</button>
    </div>
  );
};

export default EndForm;
