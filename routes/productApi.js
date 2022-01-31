const express = require('express');
const {create, read} = require('./../controller/products');
var app = express();

app.post('/createProduct', async (req, res) => {
    try {
        if(Object.keys(req.body).length == 0) {
            console.log('user does not have sufficiant details');
            return res.status(400).send({msg: 'you have insufficient details'});
        }
        let savingProductDetails = await create(req.body)
        if(savingProductDetails.code == 200) {
            console.log('saved details is:::::',savingProductDetails);
            return res.status(savingProductDetails.code).send({msg: "product details saved sucessfully",data: savingProductDetails.data})
        }
        console.log('details not saved to db');
        return res.status(savingProductDetails.code).send({msg: savingProductDetails.msg});
    } catch(err) {
        console.log('something wrong...',err);
    } 
})


app.get('/getProduct', async (req, res) => {
    console.log('req params', req.query);
    try {
        let productDetails = await read(req.query.id);
        if(productDetails.code == 200) {
            console.log('product details found',productDetails);
            return res.status(productDetails.code).send({data: productDetails});
        }
        console.log('product details not found from db');
        return res.status(productDetails.code).send({msg: productDetails.msg});
    } catch(err) {
        console.log('something went wrong',err);
    }
})
module.exports = app;
