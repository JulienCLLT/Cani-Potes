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
export const saveProfileInState = (profile) => ({
  type: SAVE__PROFILE__IN__STATE,
  profile,
});
