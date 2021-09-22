
const userController = {
    addNewUser : async (request, response)=>{   
        try {
            await response.send('test userController').end();
        } catch (error) {
            response.status(500)
        }

    },
};

module.exports = userController;