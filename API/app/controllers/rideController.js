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
            const rideId = Number(request.params.id);
            // todo  fausse data en attendant test avec jwt
            const userId = 1;

            if (isNaN(rideId)) {
                throw Error('La valeur de l\'id Ride doit être un nombre');
            }

            const rideToDelete = await Ride.findById(rideId);
            if(!rideToDelete) {
                throw Error('La balade que vous souhaitez supprimer n\'existe pas');
            }
            console.log("la balade existe");

            if(userId !== rideToDelete.host_id ){
                throw Error('Vous nêtes pas l\'organisateur de la balade');
            }
            console.log("ok orga = user");

                //si oui 
                    // method findOne : est-ce que l'instance existe ? 
                    // si oui : 
                        // appeler method model pr delete :
                            // memeber_write_ride avec id ride
                            // memeber_ participate_ride avec id_ride
                            // ride                    
                        // res bon status json ?
                    // si non peut pas suppr pas existant
        } catch (error) {
            response.status(500).json(error.message);
        }
    }
};

module.exports = rideController;