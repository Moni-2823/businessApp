const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/business',{ useNewUrlParser: true, useUnifiedTopology: true },(err,data) => {
    if(err) {
        return console.log('something wrong here',err);
    }
    console.log('connected to mongoose');
})

module.exports = { mongoose };