/* eslint-disable linebreak-style */

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

// import component
import DogForm from './DogForm/index';
import UserForm from './UserForm/index';
import EndForm from './EndForm/index';
import Timeline from './Timeline/index';

import './signup.scss';

const SignUp = () => {
  const methods = useForm();
  const onSubmit = (data) => console.log('data', data);

  return (
    <div className="signup-main">
      <h1>Inscription</h1>
      <Timeline />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <UserForm />
          <DogForm />
          <EndForm />

          {/* {formStep === 3 && <button type="submit" className="end__submit signup-main__submit">Chercher une balade</button>} */}

          {/* {formStep === 1 && (<UserForm />) }
          {formStep === 2 && (<DogForm />) }
          {formStep === 3 && (
            <>
              <EndForm />
              <button type="submit" className="end__submit signup-main__submit">
              Chercher une balade</button>
            </>
          ) } */}
        </form>
      </FormProvider>
    </div>
  );
};

export default SignUp;
