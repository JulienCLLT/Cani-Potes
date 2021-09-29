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

            console.log("ixi");
            const profileId = Number(request.params.profileId);
            if (isNaN(profileId)) {
                throw Error('La valeur de l\'id doit être un nombre');
            }

            //todo avant test
            
            // verfi si c'est meme que user token
            // const userId = request.userId;
            // if(userId !== profileId ){
            //     throw Error('Vous ne pouvez pas ajouter de chien à ce profil');
            // }
            
            //todo la verif facto dans mw? 


            // creéer unfo chien, returning ID

            // crer photo avec ID chien  returning ID

            response.json("rien")

        } catch (error) {
            response.status(500).json(error.message);
        }
    }
};

module.exports = dogController;