const Dog = require('../models/dogModel');
const Photo = require('../models/photoModel');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

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

            request.body.dog_owner_id = request.userId;
            console.log(request.body);
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

    delete: async (request, response) => {
        try {
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
    },

    updateDog: async (request, response) => {
        try {
            const profileId = Number(request.params.profileId);
            const dogId = Number(request.params.dogId);
            const userId = request.userId;

            console.log("request body", request.body);
            const updatedDog = new Dog(request.body);
            console.log("updated dog", updatedDog);

            // verif si number tout ca
            // prpofileid = userId
            // findbyId id dog owner = iduser

            // info recu ? 
            // save 

            // creer sqich function update
            // faire test avec renvoi de tout
            // update dynamique

            /*
            Si formulaire ne revoi rien j'ai quoi ? 

            surname
            description
            weight
            birthday
            breed_id
            gender_id
            behavior_id
            id
            */

            // est-ce que photo ? suppr ou rajout photo ? 

            /*

              async save() {
        try {
            if (this.id) {
                await db.query('SELECT update_boardgame($1)', [this]);
            } else {
                const {rows} = await db.query('SELECT new_boardgame($1) AS id', [this]);
                this.id = rows[0].id;
                return this;
            }
        } catch(error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail)
            } else {
                throw error;
            }
        }
    }

    */
            response.json("ok")
        } catch (error) {
            response.status(500).json(error.message);
        }
    }
};

module.exports = dogController;