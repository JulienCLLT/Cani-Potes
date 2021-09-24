import React from 'react';
import DogForm from './DogForm/index';
import UserForm from './UserForm/index';
import EndForm from './EndForm/index';

const SignUp = () => (
  <div className="signup">
    <UserForm />
    <DogForm />
    <EndForm />
  </div>
);

export default SignUp;
