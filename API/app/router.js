const {Router} = require('express');
const router = Router();
const userController = require('./controllers/userController');
const checkToken  = require('./middlewares/checkJwt');
const checkCreateDog = require('./middlewares/checkCreateDog');
const rideController = require('./controllers/rideController');
const dogController = require('./controllers/dogController');
const formController = require('./controllers/formController');

const multer= require('./../app/middlewares/multerConfig');

router.get('/', checkToken, function (req, res) {
    res.send('GET request to the homepage token ok '+ req.userId)});

router.get('/characteristic', formController.getDogCharacteristic);

router.post('/login',userController.login),

router.post('/subscribe',userController.addNewUser);

router.get('/rides', rideController.findAll);

router.delete('/ride/:rideId(\\d+)', checkToken, rideController.delete);
//todo quand front ok, rajout checkToken
router.get('/ride/:rideId(\\d+)', rideController.findOneRideWithAllInformations);

router.delete('/ride/:rideId(\\d+)/participation', checkToken, rideController.leaveARide);

router.post('/ride/:rideId(\\d+)/participation', checkToken, rideController.addNewParticipant);

router.delete('/ride/:rideId(\\d+)/participation/user/:userId(\\d+)', checkToken, rideController.removeUserFromRide);

//todo checktoken
router.get('/profile/:profileId(\\d+)/dogs/:dogId(\\d+)', checkToken, dogController.getOneDog);

router.post('/profile/:profileId(\\d+)/dogs/', checkToken, multer, dogController.createDog);

router.get('/social/profile/:idUser',checkToken,userController.getProfile);

module.exports = router;