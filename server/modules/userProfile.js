const mongoose = require('mongoose');

var userProfile = new mongoose.Schema({
    userName:{
    type:String,
    required: 'User Name can\'t be empty',
    },
    position: { 
      type: String,
      required: 'Position can\'t be empty'
     },
    office: { type: String,
      required: 'office can\'t be empty'
     },
    gender: { type: String },
    birthday: { type: String },
    profile_img: { type: String },
    about: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      jobdata: [
        {
          type: mongoose.Schema.Types.ObjectId,
          required: false,
          ref: 'jobDetails'
        }
      ]
},{ timestamps: true });

mongoose.model('userProfile', userProfile);