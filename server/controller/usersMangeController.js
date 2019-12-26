const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
// const userProfile = mongoose.model('userProfile');
const User = mongoose.model('User');
var ObjectId = require('mongoose').Types.ObjectId;


    module.exports.getUsers = (req, res) => {
        User.find()
        .then(user => {
            if(user){
        res.status(200).json({ status:true,
            user: user.map(r => {
            return {
                _id: r._id,
                fullName: r.fullName,
                email: r.email,
                password: r.password,
                };
            })
        });
    }else{
            const error = new Error('no user found');
            error.status = 404;
            // throw error;
            return res.status(404).json({ status: false, message: error });
    }
        })
        .catch(err => next(err));
    }

    module.exports.getUser = (req, res, next) =>{
        User.findOne({ _id: req._id },
            (err, user) => {
                if (!user)
                    return res.status(404).json({ status: false, message: 'User record not found.' });
                else
                    return res.status(200).json({ status: true, user : _.pick(user,['id','fullName','email','password']) });
            }
        );
    }

    // module.exports.getUser = (req, res) => {

    // if (!ObjectId.isValid(req.params.id))
    //     return res.status(400).send(`No record with given id : ${req.params.id}`);
  
    //     userProfile.findById(req.params.id, (err, doc) => {
    //     if (!err) { res.send(doc); }
    //     else { console.log('Error in Retriving userProfile :' + JSON.stringify(err, undefined, 2)); }
    // });
    // }
   
    module.exports.saveProfile = (req, res) => {
    var user = new User({
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
    });
  
    user.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in User Save :' + JSON.stringify(err, undefined, 2)); }
    });} 
   
    module.exports.updateProfile = (req, res) => {
        
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
  
    var profile = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password
    };
    User.findByIdAndUpdate(req.params.id, { $set: profile }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in userProfile Update :' + JSON.stringify(err, undefined, 2)); }
    });
    };
  
    module.exports.deleteUser = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
  
        User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in userProfile Delete :' + JSON.stringify(err, undefined, 2)); }
    });
    };
