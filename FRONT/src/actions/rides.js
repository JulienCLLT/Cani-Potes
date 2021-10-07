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
export const userQuitRide = (userId, rideId) => ({
  type: USER__QUIT__RIDE,
  userId,
  rideId,
});

export const SEND__NEW__MESSAGE = 'SEND__NEW__MESSAGE';
export const sendNewMessage = (
  userId, rideId, message,
) => ({
  type: SEND__NEW__MESSAGE,
  userId,
  rideId,
  message,
});

export const ADD__MESSAGE__IN__STATE = 'ADD__MESSAGE__IN__STATE';
export const addMessageInState = (message) => ({
  type: ADD__MESSAGE__IN__STATE,
  message,
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

export const KICK__USER__FROM__RIDE = 'KICK__USER__FROM__RIDE';
export const kickUserFromRide = (userId, rideId) => ({
  type: KICK__USER__FROM__RIDE,
  userId,
  rideId,
});
