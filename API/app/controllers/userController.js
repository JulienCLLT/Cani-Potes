const UserModel = require('../models/userModel');
const bcrypt = require('../services/bcrypt');

const userController = {
    login : async (request, response)=>{
        try {
            const body = request.body;
            
            const result = await UserModel.login(body.email);
            console.log(result);
                if (result) {
                    const validedPassword = await bcrypt.compare(body.password, result.password);
                        if (validedPassword) {
                            response.status(200).json({ message: "Valid password" });
                        } else {
                            response.status(400).json({ error: "Invalid Password" });
                        }
                } else {
                    response.status(401).json({ error: "User does not exist" });
                }
        } catch (error) {
            response.status(500)
        }

    },

    addNewUser : async (request, response)=>{   
        try {
            const user = new UserModel(request.body);
            user.password = await bcrypt.hash(user.password);
            const newUser = await user.save();
                if (newUser) {
                    //return un json avec les data de l'INSERT avec le nouvelle ID
                    response.status(201).json(newUser);
                  } else {
                    response.status(204).json('Update done');
                 }
        } catch (error) {
            response.status(500)
        }

    },
};

module.exports = userController;