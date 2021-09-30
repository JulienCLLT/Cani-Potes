/* eslint-disable linebreak-style */
export const NEXT_SIGNUP_FORM_STEP = 'NEXT_SIGNUP_FORM_STEP';
export const nextSignupFormStep = () => ({
  type: NEXT_SIGNUP_FORM_STEP,
});

export const USER_SIGNUP = 'USER_SIGNUP';
export const userSignup = (userForm) => ({
  type: USER_SIGNUP,
  userForm,
});

export const DOG_SIGN_UP = 'DOG_SIGN_UP';
export const dogSignUp = (dogForm) => ({
  type: DOG_SIGN_UP,
  dogForm,
});

export const GET_DOG_BREEDS_AND_BEHAVIORS = 'GET_DOG_BREEDS_AND_BEHAVIORS';
export const getDogBreedsAndBehaviors = () => ({
  type: GET_DOG_BREEDS_AND_BEHAVIORS,
});

export const SAVE_DOG_BREEDS_AND_BEHAVIORS = 'SAVE_DOG_BREEDS_AND_BEHAVIORS';
export const saveDogBreedsAndBehaviors = (allBehaviorsAndBreeds) => ({
  type: SAVE_DOG_BREEDS_AND_BEHAVIORS,
  allBehaviorsAndBreeds,
});

export const FAILED_TO_SIGNUP = 'FAILED_TO_SIGNUP';
export const failedToSignup = (errorMessage) => ({
  type: FAILED_TO_SIGNUP,
  errorMessage,
});
