var express = require('express');
var router = express.Router();
var userProfileController = require('../controller/userProfileController');

router.get('/profile', userProfileController.getUsers);
router.get('/profile/:id', userProfileController.getUser); //user ID
router.post('/profile/:id', userProfileController.saveProfile); // user id
router.put('/profile/:id', userProfileController.updateProfile); // profile id
router.delete('/profile/:id',userProfileController.deleteProfile); // user id

router.get('/jobdata',userProfileController.getUsers_withJobDe);    
router.get('/jobdata/:id',userProfileController.getUser_withJobDe); // jobdata id
router.post('/jobdata/:id',userProfileController.saveJobdata);      // profile id
router.put('/jobdata/:id',userProfileController.jobDetailsUpdate); // jobdata id
router.delete('/jobdata/:id',userProfileController.deletejobdata); // 

/* GET users listing. */
// router.get('/profile', function(req, res, next) {
//     res.send('respond with a resources');
//   });
//   router.get('/profile', (req, res) => {
//     Employee.find((err, docs) => {
//         if (!err) { res.send(docs); }
//         else { console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
//     });
// });
module.exports = router;