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
