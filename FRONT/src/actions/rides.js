/* eslint-disable linebreak-style */
export const ADD__USER__TO__RIDE = 'ADD__USER__TO__RIDE';
export const addUserToRide = ({
  id, first_name, last_name, photo, dogs,
}, rideId) => ({
  type: ADD__USER__TO__RIDE,
  participant_id: id,
  participant_first_name: first_name,
  participant_last_name: last_name,
  participant_photo: photo,
  dogs,
  rideId,
});

export const USER__QUIT__RIDE = 'USER__QUIT__RIDE';
export const removeUserFromRide = (userId, rideId) => ({
  type: USER__QUIT__RIDE,
  userId,
  rideId,
});

export const ADD__NEW__MESSAGE = 'ADD__NEW__MESSAGE';
export const addNewMessage = (
  message, sender_id, sender_photo, sender_first_name, sender_last_name,
) => ({
  type: ADD__NEW__MESSAGE,
  sent: new Date().toISOString(),
  message,
  sender_id,
  sender_photo,
  sender_first_name,
  sender_last_name,
});

export const DELETE__RIDE = 'DELETE__RIDE';
export const deleteRide = (rideId) => ({
  type: DELETE__RIDE,
  rideId,
});

export const DELETE__RIDE__IN__STATE = 'DELETE__RIDE__IN__STATE';
export const deleteRideInState = (id) => ({
  type: DELETE__RIDE__IN__STATE,
  id,
});

export const GET__ALL__RIDES = 'GET__ALL__RIDES';
export const getAllRides = () => ({
  type: GET__ALL__RIDES,
});

export const SAVE__ALL__RIDES = 'SAVE__ALL__RIDES';
export const saveAllRides = (allRides) => ({
  type: SAVE__ALL__RIDES,
  allRides,
});

export const GET__ONE__RIDE__BY__ID = 'GET__ONE__RIDE__BY__ID';
export const getOneRideById = (id) => ({
  type: GET__ONE__RIDE__BY__ID,
  id,
});

export const SAVE__ONE__RIDE = 'SAVE__ONE__RIDE';
export const saveOneRide = (ride) => ({
  type: SAVE__ONE__RIDE,
  ride,
});

export const GET__RIDE__IS__LOADING = 'GET__RIDE__IS__LOADING';
export const getRideIsLoading = () => ({
  type: GET__RIDE__IS__LOADING,
});

export const CREATE_RIDE = 'CREATE_RIDE';
export const createRide = (newRide, startPoint, endPoint) => ({
  type: CREATE_RIDE,
  newRide,
  startPoint,
  endPoint,
});

export const FAILED_TO_CREATE_RIDE = 'FAILED_TO_CREATE_RIDE';
export const failedToCreateRide = (errorMessage) => ({
  type: FAILED_TO_CREATE_RIDE,
  errorMessage,
});
