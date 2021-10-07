const Ride = require('../models/rideModel');
const User = require('../models/userModel');

const rideController = {
    findAll: async (_, response) => {
        try {
            const rides = await Ride.findAll();
            response.status(201).json(rides);
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    findOneRideWithAllInformations: async (request, response) => {
        try {
            const rideId = Number(request.params.rideId);

            if (isNaN(rideId)) {
                throw Error('La valeur de l\'id doit être un nombre');
            }

            const ride = await Ride.findOneCompleteRide(rideId);
            if (ride.length === 0) {
                throw Error('La balade n\'existe pas');
            }

            response.status(201).json(ride);

        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    getRidesByMember: async (request, response) => {
        try {
            //! const userId = request.userId;
            const userId = 1;
            const rides = await Ride.findRidesByMember(userId);
            console.log("rides", rides);
            response.status(201).json(rides);
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    create: async (request, response) => {
        try {
            const userId = request.userId;

            const newRide = new Ride(request.body);
            if (newRide.duration) {
                newRide.duration += ' minutes';
            } else {
                newRide.duration = null;
            }
            const rideCreated = await newRide.createRide();
            response.status(201).json(rideCreated);
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    delete: async (request, response) => {
        try {
            const rideId = Number(request.params.rideId);
            const userId = request.userId;

            if (isNaN(rideId)) {
                throw Error('La valeur de l\'id Ride doit être un nombre');
            }

            const rideToDelete = await Ride.findById(rideId);
            if (!rideToDelete) {
                throw Error('La balade que vous souhaitez supprimer n\'existe pas');
            }

            if (userId !== rideToDelete.host_id) {
                throw Error('Vous nêtes pas l\'organisateur de la balade');
            }

            // delete messages and member from this ride, then ride
            await Ride.deleteMessagesByRideId(rideId);
            await Ride.deleteAllParticipantsFromRide(rideId);
            await Ride.deleteRide(rideId);

            response.status(204).json("La balade a été supprimée");
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    leaveARide: async (request, response) => {
        try {
            const rideId = Number(request.params.rideId);
            // todo  fausse data en attendant test avec jwt
            const userId = request.userId;

            if (isNaN(rideId)) {
                throw Error('La valeur de l\'id Ride doit être un nombre');
            }

            await Ride.deleteMemberParticipateRide(userId, rideId);

            response.status(204).json("Le membre a été retiré de la balade");
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    removeUserFromRide: async (request, response) => {
        try {
            const rideId = Number(request.params.rideId);
            const userId = Number(request.params.userId);

            const hostId = request.userId;

            if (isNaN(rideId) || isNaN(userId)) {
                throw Error('La valeur de l\'id doit être un nombre');
            }

            const ride = await Ride.findById(rideId);
            if (!ride) {
                throw Error('La balade n\'existe pas');
            }
            if (hostId !== ride.host_id) {
                throw Error('Vous nêtes pas l\'organisateur de la balade: vous ne pouvez pas supprimer des participants');
            }
            if (hostId === userId) {
                throw Error('Vous ne pouvez pas vous retirer d\'une balade que vous organisez');
            }

            await Ride.deleteMemberParticipateRide(userId, rideId);

            response.status(204).json("Le membre a été retiré de la balade");

        } catch (error) {
            response.status(500).json(error.message);
        }

    },

    addNewParticipant: async (request, response) => {
        try {
            const rideId = Number(request.params.rideId);
            // todo  fausse data en attendant test avec jwt
            const userId = request.userId;

            if (isNaN(rideId)) {
                throw Error('La valeur de l\'id Ride doit être un nombre');
            }

            const newParticipant = await User.findOne(userId);
            if (!newParticipant) {
                throw Error('Le membre que vous souhaitez rajouter n\'existe pas');
            }

            const ride = await Ride.findById(rideId);
            if (!ride) {
                throw Error('La balade à laquelle vous souhaitez vous rajouter n\'existe pas');
            }
            if (userId === ride.host_id) {
                throw Error('Le membre à rajouter est dejà l\'organisateur');
            }

            // todo verif si clé existe deja paire /membre ou pas deja inscrit dans balade

            await Ride.postMemberParticipateRide(userId, rideId);

            response.status(201).json(newParticipant)
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    // /ride
    createRide: async (request, response) => {
        try {
            // prendre userId du token
            //todo lier avec joi pour verif
            const newRide = new Ride(request.body);
            const rideCreated = await newRide.create(); //todo faire model
            response.status(201).json(dogCreated);

        } catch (error) {
            response.status(500).json(error.message);
        }
    }


};

module.exports = rideController;