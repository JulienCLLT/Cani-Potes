/* eslint-disable linebreak-style */

import React from 'react';
import { useForm, useFormContext, FormProvider } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

// import component
import DogForm from './DogForm/index';
import UserForm from './UserForm/index';
import EndForm from './EndForm/index';
import Timeline from './Timeline/index';

import './signup.scss';

const SignUp = () => {
  // const { handleSubmit } = useForm();
  const methods = useForm();
  const onSubmit = (data) => console.log(data);

  // const dispatch = useDispatch();

  // const formStep = useSelector((state) => state.signup.formStep);

  return (
    <div className="signup-main">
      <h1>Inscription</h1>
      <Timeline />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <UserForm />
          <DogForm />
          <EndForm />
          <button type="submit" className="end__submit signup-main__submit">Chercher une balade</button>
        </form>
      </FormProvider>
      {/* {formStep === 1 && <UserForm /> }
        {formStep === 2 && <DogForm /> }
        {formStep === 3 && <EndForm /> }
        {formStep === 3 && (
        <button type="submit" className="end__submit signup-main__submit">Chercher une balade</button>
        )} */}
    </div>
  );
};

export default SignUp;
