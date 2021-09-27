export const LOGIN__USER = 'LOGIN__USER';
export const loginUser = (data) => ({
  type: LOGIN__USER,
  data,
});

export const CONNECT__USER = 'CONNECT__USER';
export const connectUser = (user) => ({
  type: CONNECT__USER,
  user,
});

export const LOGOUT__USER = 'LOGOUT__USER';
export const logoutUser = () => ({
  type: LOGOUT__USER,
});
