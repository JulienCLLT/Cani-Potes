const { bcrypt, jwt, apiGeo, sharpResizeImage } = require('../services');
const { UserModel, DogModel, RideModel, PhotoModel } = require('../models');

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

                    //response.set({'authorization': token})
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

                sharpResizeImage.sharpResize(request.file, 'user_resized');

                //push name path a image resized 
                request.body.photo = request.file.filename;
            };

            const user = new UserModel(request.body);
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

    updateUser: async (request, response) => {
        try {

            const idPayload = request.userId;
            request.body.id = idPayload;
            // on check la validité du mail avant toute modif avec la contrainte sql 
            const user = new UserModel(request.body);
            await user.save(user);

            if (request.file) {
                sharpResizeImage.sharpResize(request.file, 'user_resized');
                const oldPhoto = await UserModel.findOne(idPayload);

                if (oldPhoto.photo != 'avatar.jpg') {
                    sharpResizeImage.delOldImage('user_resized', oldPhoto.photo);
                };

                const newPhoto = new UserModel({ id: idPayload, photo: request.file.filename });

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
            const dogsId = await DogModel.findDogFromMember(userId);
            for (dog of dogsId) {
                await PhotoModel.deletePhotos(dog.id);
                await DogModel.delete(dog.id);
            }

            // delete his participations to ride
            await RideModel.deleteParticipationsOfOneMember(userId);
            // delete all messages sent by user
            await RideModel.deleteMessagesFromMember(userId);

            const ridesHosted = await RideModel.findRidesHostedBy(userId);
            if (ridesHosted) {
                for (ride in ridesHosted) {
                    // retirer tous les participants a ces balades 
                    await RideModel.deleteAllParticipantsFromRide(ride.id);
                    //supprimer tous les messages a ppartenant a cette balade 
                    await RideModel.deleteMessagesByRideId(ride.id);
                }
            }
            await RideModel.deleteAllRidesCreatedBy(userId);

            // delete photo in user_resized folden then delete membre in db
            await PhotoModel.deletePhotoUser(userId);
            await UserModel.deleteMember(userId);

            response.status(204).json();
        } catch (error) {
            response.status(500).json(error.message);
        }
    }
};



module.exports = userController;