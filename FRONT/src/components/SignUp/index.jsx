/* eslint-disable linebreak-style */

import React from 'react';
import { useSelector } from 'react-redux';

// import component
import DogForm from './DogForm/index';
import UserForm from './UserForm/index';
import EndForm from './EndForm/index';
import Timeline from './Timeline/index';

import './signup.scss';

const SignUp = () => {
  const isDogFormComplete = useSelector((state) => state.isDogFormComplete);
  const isUserFormComplete = useSelector((state) => state.isUserFormComplete);
  const isAuthFormComplete = useSelector((state) => state.isAuthFormComplete);
  return (
    <div className="signup-main">
      <h1>Inscription</h1>
      <Timeline />
      <UserForm />
      <DogForm />
      <EndForm />
    </div>
  );
};

export default SignUp;
