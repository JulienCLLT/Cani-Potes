const {userController, rideController, dogController, photoController, formController, mailController} =require('./controllers');
const checkToken = require('./middlewares/checkJwt');
const multer = require('./../app/middlewares/multerConfig');
const router = express.Router();


router.post('/login', userController.login);
router.post('/subscribe', multer,userController.addNewUser);
router.delete('/account/delete', checkToken, userController.deleteAccount);
router.patch('/account/edit', checkToken, multer, userController.updateUser);
router.get('/social/profile/:idUser', checkToken, userController.getProfile);





router.route('/ride')
    .get(checkToken, rideController.getRidesByMember)
    .post(checkToken, rideController.create);

    router.route('/ride/:rideId(\\d+)')
    .get(checkToken, rideController.findOneRideWithAllInformations)
    .delete(checkToken, rideController.delete);

router.route('/ride/:rideId(\\d+)/participation')
    .post(checkToken, rideController.addNewParticipant)
    .delete(checkToken, rideController.leaveARide);

router.get('/rides', checkToken, rideController.findAll);
router.delete('/ride/:rideId(\\d+)/participation/user/:userId(\\d+)', checkToken, rideController.removeUserFromRide);





router.route('/profile/:profileId(\\d+)/dogs/:dogId(\\d+)')
    .get(checkToken, dogController.getOneDog)
    .patch(checkToken, multer, dogController.updateDog)
    .delete(checkToken, dogController.delete);

router.post('/profile/:profileId(\\d+)/dogs/', checkToken, multer, dogController.createDog);





router.delete('/profile/:profileId(\\d+)/dogs/:dogId(\\d+)/photo/:photoId(\\d+)', checkToken, photoController.delete);
router.post('/social/message/ride/:idRide', checkToken, mailController.sendMailToRide);
router.get('/characteristic', formController.getDogCharacteristic);


module.exports = router;