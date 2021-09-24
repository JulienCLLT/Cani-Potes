require("dotenv").config();
const express = require("express");

const app = express();

const port = process.env.PORT || 3500;

const Ride = require("./app/models/rideModel");

const testFindAllRides = async () => {
  const rides = await Ride.findAll();
  // console.log('rides : ', rides);
  //    for(ride of rides){
  // console.log("ride:", rides[0]);
  //   }

  for (ride of rides) {
    console.log("ride:", ride.participant[0].dogs);
  }
};

testFindAllRides();

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
