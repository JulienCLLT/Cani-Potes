const jwt = require('jsonwebtoken');


const jwtToken = {
    signToken: (payload)=>{
        return jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256', expiresIn: '1h' });
    },

    verifyToken: (token)=>{
        try {
            return jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
        } catch (error) {
            throw error;
        }
    }

}

module.exports = jwtToken;



