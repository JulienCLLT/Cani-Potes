/* eslint-disable linebreak-style */

import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

// import component
import DogForm from './DogForm/index';
import UserForm from './UserForm/index';
import EndForm from './EndForm/index';
import Timeline from './Timeline/index';

import './signup.scss';

const SignUp = () => {
  const { handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="signup-main">
      <h1>Inscription</h1>
      <Timeline />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* {formStep === 1 && <UserForm /> }
        {formStep === 2 && <DogForm /> }
        {formStep === 3 && <EndForm /> }
        {formStep === 3 && (
        <button type="submit" className="end__submit signup-main__submit">Chercher une balade</button>
        )} */}
        <UserForm />
        <DogForm />
        <EndForm />
        <button type="submit" className="end__submit signup-main__submit">Chercher une balade</button>
      </form>
    </div>
  );
};

export default SignUp;
