/* eslint-disable linebreak-style */
// import { axiosInstance } from '../services/axios';
import axios from 'axios';

import {
  GET__ALL__RIDES, GET__ONE__RIDE__BY__ID, DELETE__RIDE, ADD__USER__TO__RIDE,
  saveAllRides, saveOneRide, deleteRideInState, USER__QUIT__RIDE,
} from '../actions/rides';

const ridesMiddleware = (store) => (next) => (action) => {
  const axiosInstance = axios.create({
    baseURL: 'http://107.22.144.90/api',
    headers: {
      'Access-Control-Allow-Origin': '*',
      authorization: `${store.getState().user.token}`,
    },
  });

  switch (action.type) {
    case GET__ALL__RIDES:
      axiosInstance
        .get('/rides')
        .then(
          (response) => {
            store.dispatch(saveAllRides(response.data));
          },
        )
        .catch(
          (error) => console.error('erreur : ', error.response.data),
        );
      next(action);
      break;
    case GET__ONE__RIDE__BY__ID:
      axiosInstance
        .get(`/ride/${action.id}`)
        .then(
          (response) => {
            store.dispatch(saveOneRide(response.data[0]));
          },
        )
        .catch(
          (error) => console.error('erreur : ', error.response.data),
        );
      break;
    case ADD__USER__TO__RIDE:
      axiosInstance
        .post(`/ride/${action.rideId}/participation`)
        .then((response) => {
          console.log(response);
          next(action);
        })
        .catch((error) => {
          console.error("Can't join the ride : ", error.response.data);
        });
      break;
    case USER__QUIT__RIDE:
      axiosInstance
        .delete(`/ride/${action.rideId}/participation`, {
          userId: action.userId,
        })
        .then((response) => {
          console.log('You quit this ride : ', response);
          next(action);
        })
        .catch((error) => console.error("Error, can't quit the ride : ", error.response.data));
      break;
    case DELETE__RIDE:
      axiosInstance
        .delete(`/ride/${action.id}`)
        .then(
          (response) => {
            console.log('Ride deleted successfully : ', response);
            store.dispatch(deleteRideInState(action.id));
          },
        )
        .catch(
          (error) => console.error("Can't delete ride : ", error.response.data),
        );
      break;
    default:
      next(action);
      break;
  }
};

export default ridesMiddleware;
