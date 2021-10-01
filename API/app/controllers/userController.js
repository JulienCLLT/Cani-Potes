const bcrypt = require('../services/bcrypt');
const jwt = require('../services/jwtoken');
const apiGeo = require('../services/apiGeo');

const UserModel = require('../models/userModel');
const Dog = require('../models/dogModel');
const Ride = require('../models/rideModel');

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
            const user = new UserModel(request.body);

            //on Bcrypt et remplace direct le password
            user.password = await bcrypt.hash(user.password);

            const newUser = await user.save();
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

    save: async (request, response) => {
        try {
            const idPayload = request.userId; //normalement on recupe id de l'user dans le payload

            request.body.id = idPayload;
            const user = new UserModel(request.body);
            await user.save(user);
            response.status(204).json('Update done');
        } catch (error) {
            response.status(500).json(error.message);
        }
    },

    deleteAccount: async (request, response) => {
        try {
            const userId = request.userId;

            const dogsId = await Dog.findDogFromMember(userId);

            // appeler la controller dog pour supprimer ces chiens (boucle sur tab) => ca va suppr chien ET  photo
            for (dog in dogsId) {
                //todo method dans une autre branche à merger
            }

            // suppr All participations aux balades dans lesquelles il est inscrit
            await Ride.deleteParticipationsOfOneMember(userId);

            const ridesHosted = await Ride.findRidesHostedBy(userId);
            //todo faire en une seule requete et JOIN ? 
            for (ride in ridesHosted) {
                // retirer tous les participants a ces balades 
                await Ride.deleteAllParticipantsFromRide(ride.id);

                //supprimer tous les messages a ppartenant a cette balade 
                await Ride.deleteMessagesByRideId(ride.id);
            }
            await Ride.deleteAllRidesCreatedBy(userId);
            await UserModel.deleteMember(userId);

            response.status(204).json;
        } catch (error) {

        }
    }
};



module.exports = userController;