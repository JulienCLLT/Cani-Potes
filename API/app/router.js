const {Router} = require('express');
const router = Router();
const userController = require('./controllers/userController');
const rideController = require('./controllers/rideController');

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (request, file, cb)=>{}
})
const upload = multer({ storage: storage });



router.get('/', function (req, res) {
    res.send('GET request to the homepage')});

// router.post('/login',userController.login),

router.post('/subscribe',userController.addNewUser);

router.get('/rides', rideController.findAll);

//todo regex id
//todo rajouter mw de verif identité
router.delete('/ride/:id', rideController.delete)


module.exports = router;