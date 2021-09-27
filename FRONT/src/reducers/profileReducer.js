const profileInitialState = {
  id: 65,
  first_name: 'Jean-Jacques',
  last_name: 'Le cool',
  photo: '',
  dogs: [
    {
      dog_id: 101,
      dog_photo: "img12.jpg",
      dog_surname: "Nestor",
      dog_photo_id: 9,
    },
    {
      dog_id: 102,
      dog_photo: "img14.jpg",
      dog_surname: "Baveux",
      dog_photo_id: 11,
    },
  ],
};

const profileReducer = (state = profileInitialState, action = {}) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default profileReducer;
