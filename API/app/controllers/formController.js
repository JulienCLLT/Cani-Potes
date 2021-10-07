const { BreedModel, BehaviorModel } = require('../models');


const formController = {
    getDogCharacteristic : async (_, response)=>{   
        try {
            const breeds = await BreedModel.findAll();
            const behaviors = await BehaviorModel.findAll();

            response.status(201).json({breeds, behaviors});
        } catch (error) {
            response.status(500).json(error.message);
        }
    }
};

module.exports = formController;