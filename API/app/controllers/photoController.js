const Photo = require('../models/photoModel');
const Dog = require('../models/dogModel');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const photoController = {

    delete: async (request, response) => {
        try {
            //todo facto ces verif souvent recurente
            const profileId = Number(request.params.profileId);
            const dogId = Number(request.params.dogId);
            const photoId = Number(request.params.photoId);
            if (isNaN(profileId) || isNaN(dogId) || isNaN(photoId)) {
                throw Error('La valeur de l\'id doit être un nombre');
            }

            const userId = request.userId;

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

            await Photo.deleteOnePhoto(photoId);
            response.status(204).json();

        } catch (error) {
            response.status(500).json(error.message);
        }
    },

};

module.exports = photoController;