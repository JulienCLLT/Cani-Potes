/* eslint-disable linebreak-style */

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';

// import component
import DogForm from './DogForm/index';
import UserForm from './UserForm/index';
import EndForm from './EndForm/index';
import Timeline from './Timeline/index';

import './signup.scss';

const SignUp = () => {
  const methods = useForm();
  const onSubmit = (data) => console.log(data);

  const formStep = useSelector((state) => state.signup.formStep);

  return (
    <div className="signup-main">
      <h1>Inscription</h1>
      <Timeline />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className={formStep === 1 ? 'visible' : 'hidden'}>
            <UserForm />
          </div>
          <div className={formStep === 2 ? 'visible' : 'hidden'}>
            <DogForm />
          </div>
          <div className={formStep === 3 ? 'visible' : 'hidden'}>
            <EndForm />
          </div>
          <button type="submit" className="end__submit signup-main__submit">Chercher une balade</button>

          {/* {formStep === 1 && (<UserForm />) }
          {formStep === 2 && (<DogForm />) }
          {formStep === 3 && (
            <>
              <EndForm />
              <button type="submit" className="end__submit signup-main__submit">Chercher une balade</button>
            </>
          ) } */}
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUp;
