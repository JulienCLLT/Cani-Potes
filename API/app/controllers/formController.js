const Breed = require('../models/breedModel');
const Behavior = require('../models/behaviorModel');

const formController = {
    getDogCharacteristic : async (_, response)=>{   
        try {
            const breeds = await Breed.findAll();
            const behaviors = await Behavior.findAll();

            response.status(201).json({breeds, behaviors});
        } catch (error) {
            response.status(500).json(error.message);
        }
    }
};

module.exports = formController;