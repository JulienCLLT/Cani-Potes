const jwt = require('../services/jwtoken');


module.exports = (request, response, next) => {
    try {
        console.log("req cookies", request.cookies);
        let token = request.cookies.token;
        // let token = request.get('authorization');

        const verify = jwt.verifyToken(token);
        //request.userId objet pour le back et les requetes sql
        request.userId = verify.id;

        next();

    } catch (error) {
        response.status(500).json(error);
        //possibilité de res.redirect 
    }
};









