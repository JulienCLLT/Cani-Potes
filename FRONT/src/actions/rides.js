export const ADD__USER__TO__RIDE = 'ADD__USER__TO__RIDE';
export const addUserToRide = ({id, first_name, last_name, photo, dogs }) => ({
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
