const Dog = require('../models/dogModel');

const dogController = {

    getOneDog: async (request, response) => {
        try {
            const profileId = Number(request.params.profileId);
            const dogId = Number(request.params.dogId);

            if (isNaN(profileId) || isNaN(dogId)) {
                throw Error('La valeur de l\'id doit être un nombre');
            }

            const dog = await Dog.findById(dogId);
            if (!dog) {
                throw Error('Ce chien n\'existe pas');
            }

            if (dog.owner_id !== profileId) {
                throw Error('Ce chien n\'appartient pas à ce profil');
            }
            response.status(201).json(dog);
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    delete: async (request, response) => {
        try {
            const profileId = Number(request.params.profileId);
            const dogId = Number(request.params.dogId);
            //todo change token / request.userId
            const userId = 1;

            if (isNaN(profileId) || isNaN(dogId)) {
                throw Error('La valeur de l\'id doit être un nombre');
            }
            if (profileId !== userId) {
                throw Error('Vous ne pouvez pas accéder à cette demande');
            }

            const dogToDelete = await Dog.findById(dogId);
            if (!dogToDelete) {
                throw Error('Ce chien n\'existe pas');
            }
            if (dogToDelete.owner_id !== userId) {
                throw Error('Vous n\'êtes pas le propriétaire du chien');
            }

            await Dog.delete(dogId);
            response.status(204);

        } catch (error) {
            response.status(500).json(error.message);
        }
    }
};

module.exports = dogController;