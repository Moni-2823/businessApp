const {Schema , model} = require('mongoose');

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    bio: { type: Number},
    profilePic: { type: String },
    token: { type: String }
})
var userModel = model('userModel',userSchema);
module.exports = { userModel };