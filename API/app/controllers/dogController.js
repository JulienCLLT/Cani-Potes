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
            // delete toute l'entrée du chien dogId
            // verif profileId = userId
            // find dogId si existe
            // si oui, verif host_id = userId
            // si ok : delete ligne
            // res status ? 

        } catch (error) {
            response.status(500).json(error.message);
        }
    }
};

module.exports = dogController;