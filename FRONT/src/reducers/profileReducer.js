
const profileInitialState = {
  id: 1,
  first_name: 'Jean-Paul',
  last_name: 'Le Test',
  photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmhGJKStlb13cEunZtnDqn0xoPVl1_mZeMew&usqp=CAU',
  zipcode: 75000,
  dogs: [
    {
      dog_photo: [
        {
          photo_id: 1,
          photo_url: "https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg",
        },
      ],
      dog_id: 101,
      dog_surname: "Riri",
      dog_behavior: "foufou",
      dog_breed: "caniche",
      dog_gender: "male",
      dog_weight: "27",
      dog_age: 27, // convertion en integer de nombre de mois
      dog_sterilization: true,
      dog_description: "Il est gentil mais faut pas l'emmerder",
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
