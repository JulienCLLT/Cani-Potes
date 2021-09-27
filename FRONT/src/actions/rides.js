/* eslint-disable linebreak-style */
export const ADD__USER__TO__RIDE = 'ADD__USER__TO__RIDE';
export const addUserToRide = ({
  id, first_name, last_name, photo, dogs,
}) => ({
  type: ADD__USER__TO__RIDE,
  participant_id: id,
  participant_first_name: first_name,
  participant_last_name: last_name,
  participant_photo: photo,
  dogs,
});

export const REMOVE__USER__FROM__RIDE = 'REMOVE__USER__FROM__RIDE';
export const removeUserFromRide = (id) => ({
  type: REMOVE__USER__FROM__RIDE,
  id,
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
export const deleteRide = (id) => ({
  type: DELETE__RIDE,
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
