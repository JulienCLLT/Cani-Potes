const jwt = require('jsonwebtoken');



//argument de signToken = data d'indentification. un spread fonctionne => await signToken({...obj})
async function signToken (payload){
    return jwt.sign(payload, process.env.JWT_SECRET, { algorithm: 'HS256',expiresIn: '1h' });
    
};

async function verifyToken (token){
    try {
        return jwt.verify(token, process.env.JWT_SECRET, {algorithms:["HS256"] });
    } catch (error) {
        console.log(error);
        /*
      err = {
        name: 'TokenExpiredError',
        message: 'jwt expired',
        expiredAt: 1408621000
      }
    */
        
        
    }
   
};

module.exports = { signToken, verifyToken};


// obj test
// const obj = {
//     "email": 'jeanyves@gmail.fr',
//     "userId": 3453

// };

// async function run (){
//    // const test = await signToken({...obj});
//     const verify = await verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MzIzOTExMTQsImV4cCI6MTYzMjM5NDcxNH0.ERhzTBehTo0idiuX_L_JA0FQRNr2vrdnbPb9C_gqo5s');

//    // console.log(test);
//     console.log(verify);
// };

// run();