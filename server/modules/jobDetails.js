const mongoose = require('mongoose');

var jobDetails = new mongoose.Schema({
    cv: { 
      type: String,
      required: 'cv can\'t be empty'
     },
    skills: { type: String },
    languages: { type: String },
    colifications: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      }
},{ timestamps: true });

mongoose.model('jobDetails', jobDetails);