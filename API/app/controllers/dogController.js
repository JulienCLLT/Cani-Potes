const Dog = require('../models/dogModel');
const Photo = require('../models/photoModel');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { findDogFromMember } = require('../models/dogModel');

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

    createDog: async (request, response) => {
        try {
            const profileId = Number(request.params.profileId);
            if (isNaN(profileId)) {
                throw Error('La valeur de l\'id doit être un nombre');
            }
            const userId = request.userId;
            if (userId !== profileId) {
                throw Error('Vous ne pouvez pas ajouter de chien à ce profil');
            }

            console.log("request body create dog", request.body);
            request.body.dog_owner_id = userId;

            const newDog = new Dog(request.body);
            const dogCreated = await newDog.create();


            if (request.file) {
                const { filename: image } = request.file;

                // resize picture and push it in resized file
                await sharp(request.file.path).resize(200, 200).jpeg({ quality: 90 })
                    .toFile(path.resolve(request.file.destination, 'dog_resized', image));
                fs.unlinkSync(request.file.path);

                // insert the photo data in db
                const newPhoto = new Photo({ file: request.file.filename, dogId: dogCreated.id });
                const photoCreated = await newPhoto.addPhoto();
                dogCreated.photo = photoCreated;
            }
            response.status(201).json(dogCreated);
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    updateDog: async (request, response) => {
        try {
            const profileId = Number(request.params.profileId);
            const dogId = Number(request.params.dogId);
            if (isNaN(profileId) && isNaN(dogId)) {
                throw Error('La valeur de l\'id doit être un nombre');
            }

            const userId = request.userId;
            if (userId !== profileId) {
                throw Error('Vous ne pouvez pas modifier les chiens de ce profil');
            }

            const findDog = await Dog.findById(dogId);
            console.log("find dog", findDog);
            if (!findDog) {
                throw Error('Ce chien n\'existe pas');
            }
            if (findDog.owner_id !== userId) {
                throw Error('Vous n\'être pas le maître de ce chien');
            }

            //todo joi
            request.body.id = dogId;
            const dogToUpdate = new Dog(request.body);
            // info recu ? 
            await dogToUpdate.save();
            const dogUpdated = await Dog.findById(dogId);

            if (request.file) {
                const { filename: image } = request.file;

                // resize picture and push it in resized file
                await sharp(request.file.path).resize(200, 200).jpeg({ quality: 90 })
                    .toFile(path.resolve(request.file.destination, 'dog_resized', image));
                fs.unlinkSync(request.file.path);

                // insert the photo data in db
                const newPhoto = new Photo({ file: request.file.filename, dogId: dogId });
                const photoCreated = await newPhoto.addPhoto();
                dogUpdated.photo = photoCreated;
            }
            response.status(201).json(dogUpdated);
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    delete: async (request, response) => {
        try {
            console.log("request user.id", request.userId);

            const profileId = Number(request.params.profileId);
            const dogId = Number(request.params.dogId);

            const userId = request.userId;

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

            //todo delete photo sur serveur ? 
            await Photo.deletePhotos(dogId);
            await Dog.delete(dogId);
            response.status(204).json();

        } catch (error) {
            response.status(500).json(error.message);
        }
    }

};

module.exports = dogController;