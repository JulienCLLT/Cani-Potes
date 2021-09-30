const Dog = require('../models/dogModel');

const dogController = {
    
    getOneDog : async (request, response) => {
        try {
            const profileId = Number(request.params.profileId);
            const dogId = Number(request.params.dogId);

            if(isNaN(profileId) || isNaN(dogId)){
                throw Error('La valeur de l\'id doit être un nombre');
            }

            const dog = await Dog.findById(dogId);
            if(!dog) {
                throw Error('Ce chien n\'existe pas');
            }

            if(dog.owner_id !== profileId) {
                throw Error('Ce chien n\'appartient pas à ce profil');
            }

            response.status(201).json(dog);

            
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    createDog: async (request, response) => {
        try {
            const profileId = Number(request.params.profileId);
            if (isNaN(profileId)) {
                throw Error('La valeur de l\'id doit être un nombre');
            }

            console.log("content form:", request.body);
            console.log("file", request.file);

            //todo avant test
            // verfi si c'est meme que user token
            // const userId = request.userId;
            // if(userId !== profileId ){
            //     throw Error('Vous ne pouvez pas ajouter de chien à ce profil');
            // }

            const newDog = new Dog(request.body);
            const dogCreated = await newDog.create();

            // crer photo avec ID chien  returning ID

            response.status(201).json(dogCreated);

        } catch (error) {
            response.status(500).json(error.message);
        }
    }
};

module.exports = dogController;
