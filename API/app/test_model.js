require('dotenv').config();
const client = require('./database');

const Ride = require('./models/ride');

const testFindAllRides = async () => {
    const rides = await Ride.findAll();
   // console.log('rides : ', rides);
//    for(ride of rides){
       console.log("ride:", rides[0]);
//   }
 
    
}

testFindAllRides();
