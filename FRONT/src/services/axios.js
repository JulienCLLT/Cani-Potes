/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { useSelector } from 'react-redux';

// let token;
// if (localStorage.getItem('jwt')) {
//   token = localStorage.getItem('jwt');
// }

// const { token } = useSelector((state) => state.user);

export const axiosInstance = axios.create({
  baseURL: 'http://107.22.144.90/api',
  headers: {
    'Access-Control-Allow-Origin': '*',
    // Authorization: `Bearer ${token}`,
  },
});
