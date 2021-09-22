const ridesInitialState = {
    // get all rides from the api within an area
    //? how to do this with leaflet and SQL ?by city ? by coordinate ?
    allRides: [],
    currentRide: {
      // should be an object from bdd expected something like
      id: undefined,
      title: '',
      description: '',
      start_coordinate: [],
      end_coordinate: [],
      starting_time: undefined, //integer to convert with Date
      duration: undefined, // integer to convert into minutes or hours if > 60 min
      max_number_dogs: undefined, // integer
      type: {
          // expect id
          // expect label
      },
      host: {
          // expect id
          // expect photo link
          // expect first_name
      },
      created_at: '', // expect a string
      updated_at: '', // expect a string
      members: [ // array of users
        {
            // expect id
            // expect first_name
            // expect last_name
            // expect photo
            // expect array of dogs
            /*
                {
                    expect id of dog
                    expect surname
                    expect photo
                    expect behavior
                }
            */
        }
      ], 
      messages: [] // expecting an array of object with author, content, writtenAt
    }
  };
  
  const ridesReducer = (state = ridesInitialState, action = {}) => {
    switch (action.type) {

      default:
        return state;
    }
  };
  
  export default ridesReducer;