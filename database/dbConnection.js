const mongoose = require('mongoose');
let dbUri = "mongodb+srv://cluster0.hcpdu.mongodb.net/business"
// let dbUri = "mongodb://127.0.0.1/business"

mongoose.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true },(err,data) => {
    if(err) {
        return console.log('something wrong here',err);
    }
    console.log('connected to mongoose');
})

module.exports = { mongoose };