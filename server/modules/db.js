const mongoose = require('mongoose');
// mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.MONGODB_URI, (err) => {
    if(!err){console.log('MongoDB connection succeeded.');}
    else{console.log('Error in MongoDB connection :' + JSON.stringify(err, undefined, 2));}
});

require('./users');
require('./userProfile');
require('./jobDetails');