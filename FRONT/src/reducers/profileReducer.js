
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
        {
          photo_id: 2,
          photo_url: "https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg",
        },
        {
          photo_id: 3,
          photo_url: "https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg",
        },
        {
          photo_id: 4,
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
    {
      dog_photo: [
        {
          photo_id: 4,
          photo_url: "https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg",
        },
        {
          photo_id: 5,
          photo_url: "https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg",
        },
        {
          photo_id: 6,
          photo_url: "https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg",
        },
        {
          photo_id: 7,
          photo_url: "https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg",
        },
        {
          photo_id: 8,
          photo_url: "https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg",
        },
        {
          photo_id: 9,
          photo_url: "https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg",
        },
        {
          photo_id: 10,
          photo_url: "https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg",
        },
        {
          photo_id: 11,
          photo_url: "https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg",
        },
      ],
      dog_id: 102,
      dog_surname: "Gina",
      dog_behavior: "Joyeux",
      dog_breed: "Berge Allemand",
      dog_gender: "femelle",
      dog_weight: "24",
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
