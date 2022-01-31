const express = require('express');
const {create, read} = require('./../controller/user');
var app = express();


app.post('/createUser', async (req, res) => {
    try {
        if(Object.keys(req.body).length == 0) {
            console.log('user does not have sufficiant details');
            return res.status(400).send({msg: 'you have insufficient details'});
        }
        let savingUserDetails = await create(req.body)
        if(savingUserDetails.code == 200) {
            console.log('user details saved successfully',savingUserDetails.data);
            return res.status(savingUserDetails.code).send({data: savingUserDetails.data});
        }
        console.log('user details not saved to db');
        return res.status(savingUserDetails.code).send({msg: savingUserDetails.msg});
    } catch(err) {
        console.log('something wrong...',err);
    } 
})

app.get('/getUser', async (req, res) => {
    try {
        if(Object.keys(req.body).length == 0) {
            console.log('user does not have sufficiant details to login');
            return res.status(400).send({msg: 'you have insufficient details to login'});
        }
        if(!req.body.email || !req.body.password) {
            return res.status(400).send("please provide email and password")
        }
        let loginUserPage = await read(req.body)
        if (loginUserPage.code == 200) {
            console.log("user logged in successfully",loginUserPage)
            return res.status(loginUserPage.code).send({msg: 'you logged in successfully',data: loginUserPage.data})
        }
        res.status(loginUserPage.code).send({msg: loginUserPage.msg})
    } catch(err) {
        console.log('facing issue...',err);
    }
})

module.exports = app;
