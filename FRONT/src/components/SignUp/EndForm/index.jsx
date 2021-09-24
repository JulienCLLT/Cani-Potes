/* eslint-disable linebreak-style */
import React from 'react';

import { useSelector } from 'react-redux';

import './end-form.scss';

const EndForm = () => {
  const isEndFormHide = useSelector((state) => state.signup.isEndFormHide);
  return (
    <div className={isEndFormHide ? 'signup-hidden' : 'signup end'}>
      <h2>Fin</h2>
      <p>
        Ca y est, tout est prêt ! Tu peux enfin trouver les balades à côté de chez toi :smiley:
      </p>
      <button type="button" className="end__submit">Chercher une balade</button>
    </div>
  );
};

export default EndForm;
