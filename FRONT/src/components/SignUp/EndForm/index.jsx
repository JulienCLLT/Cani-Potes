/* eslint-disable linebreak-style */
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { previousSignupFormStep } from '../../../actions/signup';

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
      <p>
        Ca y est, tout est prêt ! Tu peux enfin trouver les balades à côté de chez toi :smiley:
      </p>
      <button onClick={clickToPrevious} type="button" className="signup__back-submit__back">Retour</button>
    </div>
  );
};

export default EndForm;
