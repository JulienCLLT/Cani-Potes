const UserModel = require('../models/userModel');
const bcrypt = require('../services/bcrypt');
const jwt = require('../services/jwtoken');

const userController = {
    login : async (request, response)=>{
        try {
            const body = request.body;

            //requete pour recup les data du membre via l'email
            const result = await UserModel.login(body.email);
            
                if (result) {

                    //compare le MPD front avec le MPD Bcrypt en BDD
                    const validedPassword = await bcrypt.compare(body.password, result.password);

                        if (validedPassword) {


                            
                            //authentification ok on genere un token
                            const token = jwt.signToken({id:result.id});
                            //response.set({'authozization': token})
                            response.status(200).json({ 
                                id: result.id, 
                                first_name: result.first_name,
                                position:"implementation API convertion zipcode ",
                                rides_id:[],
                                authozization: token
                            });
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

    addNewUser : async (request, response)=>{   
        try {
            const user = new UserModel(request.body);
            
            //on Bcrypt et remplace direct le password
            user.password = await bcrypt.hash(user.password);

            const newUser = await user.save();
                if (newUser) {
                    
                    //on envoie le nouvel ID en payload du token
                    const token = jwt.signToken({...newUser});
                    //response.set({'authozization': token});
                    response.status(201).json({message:'Welcome new user', authozization: token});
                  } else {
                    response.status(204).json('Update done');
                 }
        } catch (error) {
            response.status(500).json(error.message);
        }

    },
};

module.exports = userController;