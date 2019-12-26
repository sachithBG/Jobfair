var express = require('express');
var router = express.Router();
var userProfileController = require('../controller/usersMangeController');

router.get('/usersmange', userProfileController.getUsers);
router.post('/usersmange', userProfileController.saveProfile);
router.get('/usersmange/:id', userProfileController.getUser);
router.put('/usersmange/:id', userProfileController.updateProfile);
router.delete('/usersmange/:id',userProfileController.deleteUser);

module.exports = router;