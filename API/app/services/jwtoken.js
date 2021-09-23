const jwt = require('jsonwebtoken');



//argument de signToken = data d'indentification. un spread fonctionne => await signToken({...obj})
function signToken (payload){
    return jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256',expiresIn: '1h' });
    
};

function verifyToken (token){
    try {
        return jwt.verify(token, process.env.JWT_SECRET, {algorithms:["HS256"] });
    } catch (error) {
        throw error;
    }
   
};

module.exports = { signToken, verifyToken};



