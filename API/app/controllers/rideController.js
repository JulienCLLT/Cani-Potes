const Ride = require('../models/rideModel');

const rideController = {
    findAll : async (_, response)=>{   
        try {
            const rides = await Ride.findAll();
            response.status(201).json(rides);
        } catch (error) {
            response.status(500).json(error.message);
        }
    },
};

module.exports = rideController;