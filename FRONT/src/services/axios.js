/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

// let token;
// if (localStorage.getItem('jwt')) {
//   token = localStorage.getItem('jwt');
// }

export const axiosInstance = axios.create({
  baseURL: 'http://107.22.144.90/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    // Authorization: `Bearer ${token}`,
  },
});
