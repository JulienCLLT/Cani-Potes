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

export const LOGOUT__USER = 'LOGOUT__USER';
export const logoutUser = () => ({
  type: LOGOUT__USER,
});

export const UPDATE__USER = 'UPDATE__USER';
export const updateUser = (user) => ({
  type: UPDATE__USER,
});
