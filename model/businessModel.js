const {Schema , model} = require('mongoose');

const businessSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    registrationNo: { type: Number, required: true},
    token: { type: String }
})
var businessModel = model('businessModel',businessSchema);
module.exports = { businessModel };