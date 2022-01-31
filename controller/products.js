const { productModel } = require('./../model/productModel');


let create = async (data) => {
    try {
        let aboutProduct = new productModel(data);
        await aboutProduct.save();
        if(!aboutProduct) {
            return ({code: 404,msg: 'product details not saved to db,check again'});
        }
        return ({code: 200,data: aboutProduct});
    } catch(e) {
        console.log('having issue to save product details');
    }
}

let read = async (data) => {
    try {
        let getProductDetails = await productModel.findById({_id: data})
        if(getProductDetails) {
            return ({code: 200,data: getProductDetails});
        }
        return ({code: 404,msg: 'product details not found'});
    } catch(e) {
        console.log('occuring error',e);
    }
}

module.exports = {create, read};