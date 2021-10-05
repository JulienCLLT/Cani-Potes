const { Router } = require('express');
const router = Router();
const userController = require('./controllers/userController');
const checkCreateDog = require('./middlewares/checkCreateDog');
const checkToken = require('./middlewares/checkJwt');
const rideController = require('./controllers/rideController');
const dogController = require('./controllers/dogController');
const photoController = require('./controllers/photoController');
const formController = require('./controllers/formController');
const mailController = require('./controllers/mailController');

const multer = require('./../app/middlewares/multerConfig');

router.get('/', checkToken, function (req, res) {
    res.send('GET request to the homepage token ok ' + req.userId)
});

router.get('/characteristic', formController.getDogCharacteristic);

router.post('/login', userController.login);
router.post('/subscribe', userController.addNewUser);
router.delete('/account/delete', checkToken, userController.deleteAccount);

router.get('/rides', checkToken, rideController.findAll);

//todo checktoken
router.post('/ride', checkToken, rideController.create);
router.get('/ride', checkToken, rideController.getRidesByMember);

router.delete('/ride/:rideId(\\d+)', checkToken, rideController.delete);
router.get('/ride/:rideId(\\d+)', checkToken, rideController.findOneRideWithAllInformations);

router.delete('/ride/:rideId(\\d+)/participation', checkToken, rideController.leaveARide);
router.post('/ride/:rideId(\\d+)/participation', checkToken, rideController.addNewParticipant);
router.delete('/ride/:rideId(\\d+)/participation/user/:userId(\\d+)', checkToken, rideController.removeUserFromRide);

router.get('/profile/:profileId(\\d+)/dogs/:dogId(\\d+)', checkToken, dogController.getOneDog);
router.post('/profile/:profileId(\\d+)/dogs/', checkToken, multer, dogController.createDog);
router.delete('/profile/:profileId(\\d+)/dogs/:dogId(\\d+)', checkToken, dogController.delete);
router.delete('/profile/:profileId(\\d+)/dogs/:dogId(\\d+)/photo/:photoId(\\d+)', checkToken, photoController.delete);

router.get('/social/profile/:idUser', checkToken, userController.getProfile);
router.post('/social/message/ride/:idRide', checkToken, mailController.sendMailToRide);

router.patch('/account/edit', checkToken, userController.save);

module.exports = router;