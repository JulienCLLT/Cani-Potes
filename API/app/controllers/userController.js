const bcrypt = require('../services/bcrypt');
const jwt = require('../services/jwtoken');
const apiGeo = require('../services/apiGeo');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const UserModel = require('../models/userModel');
const Dog = require('../models/dogModel');
const Ride = require('../models/rideModel');
const Photo = require('../models/photoModel');

const userController = {
    login: async (request, response) => {
        try {
            const body = request.body;

            //requete pour recup les data du membre via l'email
            const result = await UserModel.login(body.email);

            if (result) {

                //compare le MPD front avec le MPD Bcrypt en BDD
                const validedPassword = await bcrypt.compare(body.password, result.password);

                if (validedPassword) {
                    const dataUser = await UserModel.dataUserConnexion(result.id);
                    dataUser.position = await apiGeo(dataUser.position);
                    //authentification ok on genere un token
                    const token = jwt.signToken({ id: result.id });
                    dataUser.authorization = token;

                    //response.set({'authozization': token})
                    response.status(200).json(dataUser);
                } else {
                    response.status(400).json({ error: "Invalid Password" });
                }
            } else {
                response.status(401).json({ error: "User does not exist" });
            }
        } catch (error) {
            response.status(500).json(error.message);
        }

    },

    addNewUser: async (request, response) => {
        try {
             if (request.file) {
                const { filename: image } = request.file;

                // resize picture and push it in resized file
                await sharp(request.file.path).resize(200, 200).jpeg({ quality: 90 })
                    .toFile(path.resolve(request.file.destination, 'user_resized', image));
                fs.unlinkSync(request.file.path);
                
                //push name path a image resized 
                request.body.photo = request.file.filename;
            };
            
            
            const user = new UserModel(request.body);

           
                //on Bcrypt et remplace direct le password
            user.password = await bcrypt.hash(user.password);
            
            const newUser = await user.save();
            
                //bloc code creation du json de reponse.
            if (newUser) {
                const dataUser = await UserModel.dataUserConnexion(newUser.id);
                dataUser.position = await apiGeo(dataUser.position);
                const token = jwt.signToken({ id: newUser.id });
                dataUser.authorization = token;
                //response.set({'authozization': token});
                response.status(201).json(dataUser);
            } else {
                response.status(204).json('Update done');
            }
        } catch (error) {
            response.status(500).json(error.message);
        }

    },

    getProfile: async (request, response) => {
        try {

            const dogs = await UserModel.fullProfile(request.params.idUser);
            response.status(201).json(dogs);
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    updateUser: async (request, response) => {
        try {
            const idPayload = request.userId;
            request.body.id = idPayload;
             // on fait une premiere update sans prendre en compte la photo
             // en cas insertion d'un email deja valide on catch
             // si on fait tout en une seul requete a la fin si il y a un confilt d'email le nom de la photo dans 
             // le fichier public change mais pas en bdd = confilt 
            const user = new UserModel(request.body);
            await user.save(user);

                if (request.file) {
                    const { filename: image } = request.file;

                    await sharp(request.file.path).resize(200, 200).jpeg({ quality: 90 })
                        .toFile(path.resolve(request.file.destination, 'user_resized', image));
                    fs.unlinkSync(request.file.path);
                    
                    //push name path a image resized 
                    const oldPhoto = await UserModel.findOne(idPayload);

                        if (oldPhoto.photo != 'avatar.jpg') {
                            
                            fs.unlinkSync(`public/user_resized/${oldPhoto.photo}`);
                        };
                
                        
                    const newPhoto = new UserModel({id:idPayload, photo:request.file.filename});
                    await newPhoto.save(newPhoto);
                    
                };


            response.status(204).json('Update done');
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    deleteAccount: async (request, response) => {
        try {
            const userId = request.userId;

            // delete all member's dogs + photos
            const dogsId = await Dog.findDogFromMember(userId);
            for (dog of dogsId) {
                //todo verfi suppression photo du fichier
                await Photo.deletePhotos(dog.id);
                await Dog.delete(dog.id);
            }

            // delete his participations to ride
            await Ride.deleteParticipationsOfOneMember(userId);
            // delete all messages sent by user
            await Ride.deleteMessagesFromMember(userId);

            const ridesHosted = await Ride.findRidesHostedBy(userId);
            if (ridesHosted) {
                for (ride in ridesHosted) {
                    // retirer tous les participants a ces balades 
                    await Ride.deleteAllParticipantsFromRide(ride.id);
                    //supprimer tous les messages a ppartenant a cette balade 
                    await Ride.deleteMessagesByRideId(ride.id);
                }
            }
            await Ride.deleteAllRidesCreatedBy(userId);
            // delete message
            await UserModel.deleteMember(userId);

            response.status(204).json();
        } catch (error) {
            response.status(500).json(error.message);
        }
    }
};



module.exports = userController;