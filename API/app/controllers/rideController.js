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

    delete: async (request, response) => {
        try {
            const rideId = Number(request.params.rideId);
            // todo  fausse data en attendant test avec jwt
            const userId = 1;

            if (isNaN(rideId)) {
                throw Error('La valeur de l\'id Ride doit être un nombre');
            }

            const rideToDelete = await Ride.findById(rideId);
            if(!rideToDelete) {
                throw Error('La balade que vous souhaitez supprimer n\'existe pas');
            }

            if(userId !== rideToDelete.host_id ){
                throw Error('Vous nêtes pas l\'organisateur de la balade');
            }

            // delete messages and member from this ride, then ride
            await Ride.deleteMessagesByRideId(rideId);
            await Ride.deleteAllParticipantsFromRide(rideId);
            await Ride.deleteRide(rideId);

            //todo message json ne s'affiche pas
            response.status(204).json("La balade a été supprimée");
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    leaveARide: async (request, response) => {
        try {
            const rideId = Number(request.params.rideId);
            // todo  fausse data en attendant test avec jwt
            const userId = 4;
    
            if (isNaN(rideId)) {
                throw Error('La valeur de l\'id Ride doit être un nombre');
            }
            // todo test avec id ride ou user non existant
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

            // todo  fausse data en attendant test avec jwt
            const hostId = 1;
    
            if (isNaN(rideId) || isNaN(userId)) {
                throw Error('La valeur de l\'id doit être un nombre');
            }

            const ride = await Ride.findById(rideId);
            if(!ride) {
                throw Error('La balade n\'existe pas');
            }
            if(hostId !== ride.host_id ){
                throw Error('Vous nêtes pas l\'organisateur de la balade: vous ne pouvez pas supprimer des participants');
            }
            if(hostId === userId){
                throw Error('Vous ne pouvez pas vous retirer d\'une balade que vous organisez');
            }

            await Ride.deleteAllParticipantsFromRide(userId, rideId);

            response.status(204).json("Le membre a été retiré de la balade");

        } catch (error) {
            response.status(500).json(error.message);
        }

    }


};

module.exports = rideController;