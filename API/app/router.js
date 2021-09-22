const {Router} = require('express');
const router = Router();
 const userController = require('./controllers/userController');



router.get('/', function (req, res) {
    res.send('GET request to the homepage')});

router.post('/subscribe',userController.addNewUser);



module.exports = router;