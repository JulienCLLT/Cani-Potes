require("dotenv").config();
const express = require("express");

const app = express();

const port = process.env.PORT || 3500;

const Ride = require("./app/models/rideModel");
const Dog = require("./app/models/dogModel");

const testFindOneRide = async () => {
  const rides = await Ride.findById(1);
  console.log(rides);
}

const testFindOneDog = async () => {
  const dogs = await Dog.findById(1);
  console.log(dogs);
};

//testFindOneRide(1);
testFindOneDog(1);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
