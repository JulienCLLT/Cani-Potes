const {Router} = require('express');
const router = Router();
const userController = require('./controllers/userController');
const ckeckToken  = require('./middlewares/checkJwt');
const rideController = require('./controllers/rideController');
const dogController = require('./controllers/dogController');

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (request, file, cb)=>{}
})
const upload = multer({ storage: storage });

router.get('/', ckeckToken, function (req, res) {
    res.send('GET request to the homepage token ok '+ req.userId)});

router.post('/login',userController.login),

router.post('/subscribe',userController.addNewUser);

router.get('/rides', rideController.findAll);

router.delete('/ride/:rideId(\\d+)', ckeckToken, rideController.delete);

router.delete('/ride/:rideId(\\d+)/participation', ckeckToken, rideController.leaveARide);
router.post('/ride/:rideId(\\d+)/participation', ckeckToken, rideController.addNewParticipant);

router.delete('/ride/:rideId(\\d+)/participation/user/:userId(\\d+)', ckeckToken, rideController.removeUserFromRide);

//todo add checkToken
router.get('/profile/:profileId(\\d+)/dogs/:dogId(\\d+)', dogController.getOneDog);

module.exports = router;