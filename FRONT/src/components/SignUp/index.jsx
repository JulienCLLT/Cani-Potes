/* eslint-disable linebreak-style */

import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

// import component
import DogForm from './DogForm/index';
import UserForm from './UserForm/index';
import EndForm from './EndForm/index';

import './signup.scss';

const SignUp = () => {
  const { endSignUp } = useSelector((state) => state.signup);

  return (
    <div className="signup-main">
      {endSignUp && <Redirect to="/home" />}
      <h1>Inscription</h1>
      <UserForm />
      <DogForm />
      <EndForm />

    </div>
  );
}

export default SignUp;
