const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const userProfile = mongoose.model('userProfile');
var ObjectId = require('mongoose').Types.ObjectId;

// //////////////////////////////////////

const User = mongoose.model('User');
const jobDetails = mongoose.model('jobDetails');
const { check, validationResult } = require('express-validator');
// //////////////////////////////////////
module.exports.saveProfile = (req, res, next) => {  //set user :id
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(422).json({ errors: errors.array() });
      } else {
        User.findOne() // We are tempory adding a user as the author
          .then(user => {
            var userprofile = new userProfile({
                userName:req.body.userName,
                position: req.body.position,
                office: req.body.office,
                gender:req.body.gender,
                birthday: req.body.birthday,
                profile_img: req.body.profile_img,
                about: req.body.about,
            });
            userprofile.user = user._id;
            userprofile.jobdata = [];

            return userprofile.save(userprofile);
          })
          .then(userprofile => {
            res
              .status(201)
              .json({
                message: 'userprofile created',
                id: userprofile._id,
                position: userprofile.position
              });
          })
          .catch(err => next(err));
      }
    }

    module.exports.getUsers = (req, res) => {

        userProfile.find().populate('user')
            .then(results => {
                if(results){
            return res.status(200).json({status: true, userProfiles : results.map(r => {
                    return {
                        id: r.id,
                        userName:r.userName,
                        position: r.position,
                        office: r.office,
                        gender:r.gender,
                        birthday: r.birthday,
                        about: r.about,
                        profile_img: r.profile_img,
                        jobdata: r.jobdata,
                        user:
                        (r.user && { id: r.user._id, fullName: r.user.fullName, email: r.user.email, password: r.user.password }) || null
                    };
                    })});
            } else {
                const error = new Error('no userprofiles found');
                error.status = 404;
                // throw error;
                return res.status(404).json({ status: false, message: error });
             }
            })
            .catch(err => next(err));
    }

    module.exports.getUsers_withJobDe = (req, res) => {
        jobDetails.find().populate('user')
            .then(results => {
                if(results){
            res.status(200).json({ status:true,
                results: results.map(r => {
                return {
                    id: r.id,
                    skills: r.skills,
                    languages: r.languages,
                    colifications: r.colifications,
                    user:
                    (r.user && { id: r.user._id, fullName: r.user.fullName, email: r.user.email, password: r.user.password }) || null
                };
                })
            });
        }else{
                const error = new Error('no jobData found');
                error.status = 404;
                // throw error;
                return res.status(404).json({ status: false, message: error });
        }
            })
            .catch(err => next(err));
    } 

    module.exports.getUser = (req, res, next) => {
        var query = { user: req.params.id+"" };
        userProfile.findOne(query)
            .populate('user', 'jobDetails.user')
            .then(
            r => {
                if (r) {

                return res.status(200).json({status: true, userProfile : _.pick(r,['id','userName','position','office',
                                'gender','birthday','about','profile_img','jobdata','user'])});
                } else {
                const error = new Error('no userprofile found');
                error.status = 404;
                // throw error;
                return res.status(404).json({ status: false, message: error });
                }
            },
            err => {
                const error = new Error('invalid userprofile id');
                error.status = 400;
                return res.status(404).json({ status: false, message: error });
                // throw error;
            }
            )
            .catch(err => next(err));
        };

    module.exports.getUser_withJobDe = (req, res, next) => {
        jobDetails.findById(req.params.id)
            .populate('user')
            .then(
            r => {
                if (r) {
               return res.status(200).json({ status:true,jobDetails : _.pick(r,['id','skills','languages','colifications',
                'user'])});
                } else {
                const error = new Error('no jobdata found');
                error.status = 404;
                return res.status(404).json({ status: false, message: error });
                throw error;
                }
            },
            err => {
                const error = new Error('invalid jobdata id');
                error.status = 400;
                return res.status(404).json({ status: false, message: error });
                throw error;
            }
            )
            .catch(err => next(err));
        };


    module.exports.saveJobdata = (req, res, next) => {  //set userProfile :id
        userProfile.findById(req.params.id)
            .populate('user', 'jobDetails.user')
            .then(
                r => {
                if (r) {
                    const errors = validationResult(req);
        
                    if (!errors.isEmpty()) {
                    res.status(422).json({ errors: errors.array() });
                    } else {

                    User.findOne() // We are tempory adding a user as the author
                        .then(user => {
                        var jobdetails = new jobDetails({
                            cv: req.body.cv,
                            skills: req.body.skills,
                            languages: req.body.languages,
                            colifications: req.body.colifications
                        });

                        jobdetails.user = user._id;
                        jobDetails.create(jobdetails)
                            .then(jobdetail => {
                            r.jobdata.push(jobdetail);
                            return r.save();
                            })
                            .then(r => {
                            return res.status(201).json({ message: 'jobdetails added' });
                            });
                        });
                    }
                } else {
                    const error = new Error('no userprofile found to add job data');
                    error.status = 404;
                    return res.status(404).json({ status: false, message: error });
                    throw error;
                }
                },
                err => {
                const error = new Error('invalid userprofile id');
                error.status = 400;
                return res.status(404).json({ status: false, message: error });
                throw error;
                }
            )
        
            .catch(err => next(err));
        };

   
    module.exports.updateProfile = (req, res) => {
      
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        userProfile.findById(req.params.id) // We are tempory adding a user as the author
        .then(user => {
            var profile = {
                userName:req.body.userName,
                position: req.body.position,
                office: req.body.office,
                gender:req.body.gender,
                birthday: (req.body.birthday.year+ "-" + req.body.birthday.month+"-" + req.body.birthday.day),
                profile_img: req.body.profile_img,
                about: req.body.about
            };
            profile.user = user.user._id;
            profile.jobdata = user.jobdata; 
            // console.log(profile);   
            userProfile.findByIdAndUpdate(req.params.id , profile)
            .then(r => {
            return res.status(201).json({ message: 'jobdetails update' });
            });
        });
    };
  
    module.exports.jobDetailsUpdate = (req, res) => {
      
        if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        jobDetails.findById(req.params.id)
        .then(
            r => {
            if (r) {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                res.status(422).json({ errors: errors.array() });
                } else {

                var query = { user: r.user+"" };
                userProfile.findOne(query)
                  .then(item1 => {
                    var jobdetails ={
                        cv: req.body.cv,
                        skills: req.body.skills,
                        languages: req.body.languages,
                        colifications: req.body.colifications
                    };
                    // item1 = JSON.parse(item1);
                    jobdetails.user = r.user;
                    jobDetails.findByIdAndUpdate(req.params.id , jobdetails)
                        .then(jobdetail => {
                            item1.jobdata.push(jobdetail);
                        return item1.save();
                        })
                        .then(r => {
                        return res.status(201).json({ message: 'jobdetails added' });
                        });
                    });
                }
            } else {
                const error = new Error('no jobdetails found');
                error.status = 404;
                return res.status(201).json({ message: error });
                throw error;
            }
            },
            err => {
            const error = new Error('invalid jobdetails id');
            error.status = 400;
            return res.status(201).json({ message: error });
            throw error;
            }
        )
    
        .catch(err => next(err));
        
        };

    module.exports.deletejobdata = (req, res) => {
        if (!ObjectId.isValid(req.params.id))
            return res.status(400).send(`No record with given id : ${req.params.id}`);
    
            jobDetails.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { 
            error = 'Error in jobDetails Delete :' + JSON.stringify(err, undefined, 2);
            console.log(error);
            return res.status(201).json({ message: error });
         }
        });
        };

    module.exports.deleteProfile = (req, res, next) => {
        if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
  
        User.findByIdAndDelete(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { error = 'Error in user Delete :' + JSON.stringify(err, undefined, 2);
            console.log(error);
            return res.status(201).json({ message: error });
        }});
        userProfile.findOneAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { 
                error = 'Error in userProfile Delete :' + JSON.stringify(err, undefined, 2);
                console.log(error);
                return res.status(201).json({ message: error });
            }});
        jobDetails.findOneAndRemove(req.params.id, (err, doc) => {
            if (!err) { res.send(doc); }
            else { 
            error = 'Error in jobDetails Delete :' + JSON.stringify(err, undefined, 2);
            console.log(error);
            return res.status(201).json({ message: error });
         }
    }).catch(err => next(err));
}
