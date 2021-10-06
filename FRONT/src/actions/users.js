/* eslint-disable linebreak-style */
export const LOGIN__USER = 'LOGIN__USER';
export const loginUser = (data) => ({
  type: LOGIN__USER,
  data,
});

export const CONNECT__USER = 'CONNECT__USER';
export const connectUser = (token, user) => ({
  type: CONNECT__USER,
  token,
  user,
});

export const USER__GETS__HIS__DOGS = 'USER__GETS__HIS__DOGS';
export const userGetsHisDogs = (userId) => ({
  type: USER__GETS__HIS__DOGS,
  userId,
});

export const SAVE__USER__DOGS__IN__STATE = 'SAVE__USER__DOGS__IN__STATE';
export const saveUserDogsInState = (dogs) => ({
  type: SAVE__USER__DOGS__IN__STATE,
  dogs,
});

export const FAILED__TO__CONNECT = 'FAILED__TO__CONNECT';
export const failedToConnect = () => ({
  type: FAILED__TO__CONNECT,
});

export const LOGOUT__USER = 'LOGOUT__USER';
export const logoutUser = () => ({
  type: LOGOUT__USER,
});

export const GET__ONE__USER__BY__ID = 'GET__ONE__USER__BY__ID';
export const getOneUserById = (id) => ({
  type: GET__ONE__USER__BY__ID,
  id,
});

export const GET__PROFILE__IS__LOADING = 'GET__PROFILE__IS__LOADING';
export const getProfileIsLoading = () => ({
  type: GET__PROFILE__IS__LOADING,
});

export const SAVE__PROFILE__IN__STATE = 'SAVE__PROFILE__IN__STATE';
export const saveProfileInState = (profile, userId) => ({
  type: SAVE__PROFILE__IN__STATE,
  profile,
  userId,
});

export const UPDATE__DOG = 'UPDATE__DOG';
export const updateDog = (userId, dogId, updatedDog) => ({
  type: UPDATE__DOG,
  userId,
  dogId,
  updatedDog,
});

export const UPDATE__USER = 'UPDATE__USER';
export const updateUser = (user) => ({
  type: UPDATE__USER,
  user,
});

export const GET__RIDES__WITH__USER__IN = 'GET__RIDES__WITH__USER__IN';
export const getRidesWithUserIn = () => ({
  type: GET__RIDES__WITH__USER__IN,
});

export const ADD__RIDES__TO__USER = 'ADD__RIDES__TO__USER';
export const addRidesToUser = (rides) => ({
  type: ADD__RIDES__TO__USER,
  rides,
});

export const DELETE__DOG = 'DELETE__DOG';
export const deleteDog = (userId) => ({
  type: DELETE__DOG,
  userId,
});

export const DELETE__DOG__PHOTO = 'DELETE__DOG__PHOTO';
export const deleteDogPhoto = (userId, dogId, photoId) => ({
  type: DELETE__DOG__PHOTO,
  userId,
  dogId,
  photoId,
});

export const DELETE__USER = 'DELETE__USER';
export const deleteUser = () => ({
  type: DELETE__USER,
});

export const RENDER__AGAIN = 'RENDER__AGAIN';
export const renderAgain = () => ({
  type: RENDER__AGAIN,
});

export const REINIT__RENDER__AGAIN = 'REINIT__RENDER__AGAIN';
export const reinitRenderAgain = () => ({
  type: REINIT__RENDER__AGAIN,
});
