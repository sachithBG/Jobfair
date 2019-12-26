const mongoose = require('mongoose');

var userProfile = new mongoose.Schema({
    position: { type: String },
    office: { type: String },
    salary: { type: Number }
},{ timestamps: true });

mongoose.model('userProfile', userProfile);