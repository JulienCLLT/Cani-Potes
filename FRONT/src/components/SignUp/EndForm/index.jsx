/* eslint-disable linebreak-style */
import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { endOfSignup } from '../../../actions/signup';

import happy from '../../../assets/img/sunglasses.svg';

import './end-form.scss';

const EndForm = () => {
  const dispatch = useDispatch();
  const formStep = useSelector((state) => state.signup.formStep);

  return (
    <div className={formStep === 3 ? 'signup end' : 'hidden'}>
      <h2>Fin</h2>
      <div className="end__content">
        <div className="end__content__p">
          <p>Ca y est, tout est prêt !</p>
          <p>Tu peux enfin trouver les balades près de chez toi <img src={happy} alt="happy smiley" /></p>
        </div>

        <Link
          to="/home"
          className="end__content__home"
          onClick={() => dispatch(endOfSignup())}
        >
          Chercher une balade
        </Link>
      </div>
    </div>
  );
};

export default EndForm;
