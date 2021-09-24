/* eslint-disable linebreak-style */

import React from 'react';

// import component
import DogForm from './DogForm/index';
import UserForm from './UserForm/index';
import EndForm from './EndForm/index';
import Timeline from './Timeline/index';

import './signup.scss';

const SignUp = () => (
  <div className="signup-main">
    <h1>Inscription</h1>
    <Timeline />
    <UserForm />
    <DogForm />
    <EndForm />
  </div>
);

export default SignUp;
