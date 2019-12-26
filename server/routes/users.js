var express = require('express');
var router = express.Router();

var user_controller = require('../controller/usersController');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', user_controller.register);
router.post('/authenticate', user_controller.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, user_controller.userProfile);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
