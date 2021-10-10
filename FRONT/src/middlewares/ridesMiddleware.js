/* eslint-disable linebreak-style */
import axios from 'axios';

import {
  GET__ALL__RIDES, GET__ONE__RIDE__BY__ID, DELETE__RIDE, ADD__USER__TO__RIDE,
  CREATE_RIDE, USER__QUIT__RIDE, KICK__USER__FROM__RIDE, SEND__NEW__MESSAGE,
  saveAllRides, saveOneRide, deleteRideInState, failedToCreateRide, addMessageInState, setErrorMsg,
} from '../actions/rides';
import { logoutUser, renderAgain } from '../actions/users';
import { dburlWithApi } from '../utils/dburl';

const ridesMiddleware = (store) => (next) => (action) => {
  const axiosInstance = axios.create({
    baseURL: dburlWithApi,
    headers: {
      'Access-Control-Allow-Origin': '*',
      authorization: `${store.getState().user.token}`,
    },
  });

  switch (action.type) {
    case GET__ALL__RIDES:
      axiosInstance
        .get('/rides')
        .then((response) => {
          store.dispatch(saveAllRides(response.data));
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          console.error("Can't get all rides : ", error.response.data);
        });
      next(action);
      break;
    case GET__ONE__RIDE__BY__ID:
      axiosInstance
        .get(`/ride/${action.id}`)
        .then((response) => {
          store.dispatch(saveOneRide(response.data[0]));
          console.log('ride retournée : ', response);
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }

          if (error.response.data === "La balade n'existe pas") {
            store.dispatch(setErrorMsg('Ride not found'));
          }
          console.error("Can't get this ride : ", error.response.data);
        });
      break;
    case ADD__USER__TO__RIDE:
      axiosInstance
        .post(`/ride/${action.rideId}/participation`)
        .then((response) => {
          store.dispatch(renderAgain());
          next(action);
          console.log('You join this ride : ', response);
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          console.error("Can't join the ride : ", error.response.data);
        });
      break;
    case USER__QUIT__RIDE:
      axiosInstance
        .delete(`/ride/${action.rideId}/participation`, {
          userId: action.userId,
        })
        .then((response) => {
          store.dispatch(renderAgain());
          next(action);
          console.log('You quit this ride : ', response);
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          console.error("Error, can't quit the ride : ", error.response.data);
        });
      break;
    case SEND__NEW__MESSAGE:
      axiosInstance
        .post(`/social/message/ride/${action.rideId}`, {
          message: action.message,
        })
        .then((response) => {
          store.dispatch(addMessageInState(response.data.message));
          console.log('Message sent : ', response.data.message);
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          console.error("Message didn't send : ", error.response.data);
        });
      break;
    case DELETE__RIDE:
      axiosInstance
        .delete(`/ride/${action.rideId}`)
        .then((response) => {
          store.dispatch(deleteRideInState(action.rideId));
          store.dispatch(renderAgain());
          console.log('Ride deleted successfully : ', response);
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          console.error("Can't delete ride : ", error.response.data);
        });
      break;
    case CREATE_RIDE: {
      const {
        title, date, startHour, startMin, maxDogs, description, duration,
      } = action.newRide;
      axiosInstance
        .post('/ride', {
          title,
          description,
          duration,
          start_coordinate: action.startPoint,
          end_coordinate: action.endPoint,
          starting_time: `${date} ${startHour}:${startMin}:00+02`,
          max_number_dogs: maxDogs,
          tag_id: 1, // todo modify later in v2
          host_id: store.getState().user.id,
        })
        .then((response) => {
          next(action);
          console.log('Ride created successfully : ', response);
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          store.dispatch(failedToCreateRide(error.response.data));
          console.error("Can't create ride : ", error);
        });
    }
      break;
    case KICK__USER__FROM__RIDE:
      axiosInstance
        .delete(`/ride/${action.rideId}/participation/user/${action.userId}`)
        .then((response) => {
          console.log('User kicked from ride : ', response);
          next(action);
        })
        .catch((error) => {
          if (error.response.data.name === 'TokenExpiredError') {
            localStorage.removeItem('user');
            store.dispatch(logoutUser());
          }
          console.error("Can't kick the user : ", error.response.data);
        });
      break;
    default:
      next(action);
      break;
  }
};

export default ridesMiddleware;
