const {Schema , model} = require('mongoose');

const productSchema = new Schema({
    name: { type: String, required: true },
    mrp: { type: String, required: true},
    description: { type: Number},
    image: { type: Array }
})
var productModel = model('productModel',productSchema);
module.exports = { productModel };