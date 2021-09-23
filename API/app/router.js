const {Router} = require('express');
const router = Router();
const userController = require('./controllers/userController');
const ckeckToken  = require('./middlewares/checkJwt');

const multer  = require('multer');
const storage = multer.diskStorage({
    destination: (request, file, cb)=>{}
})
const upload = multer({ storage: storage });



router.get('/', ckeckToken, function (req, res) {
    res.send('GET request to the homepage token ok '+ req.userId)});

router.post('/login',userController.login),

router.post('/subscribe',userController.addNewUser);



module.exports = router;