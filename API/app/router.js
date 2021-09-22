const {Router} = require('express');
const router = Router();
const userController = require('./controllers/userController');

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (request, file, cb)=>{}
})
const upload = multer({ storage: storage });



router.get('/', function (req, res) {
    res.send('GET request to the homepage')});

router.post('/login',userController.login),

router.post('/subscribe',userController.addNewUser);



module.exports = router;