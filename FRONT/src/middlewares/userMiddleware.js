/* eslint-disable linebreak-style */
import axios from 'axios';
import { GET__ONE__USER__BY__ID } from '../actions/users';

const axiosInstance = axios.create({
  baseURL: 'http://107.22.144.90/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

const userMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case GET__ONE__USER__BY__ID:
      axiosInstance
        .get(`/social/profile/${action.id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Can't get profile : ", error);
        });
      break;
    default:
      next(action);
  }
};

export default userMiddleware;
