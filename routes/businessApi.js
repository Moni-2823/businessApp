const express = require('express');
const {create, read, update, deletePage} = require('./../controller/business');
const { middleware } = require('./../middleware');

var app = express();


app.post('/createBusiness', async (req, res) => {
    try {
        if(Object.keys(req.body).length == 0) {
            console.log('user does not have sufficiant details');
            return res.status(400).send({msg: 'you have insufficient details'});
        }    
        let savingDetails = await create(req.body);
        if(savingDetails.code == 200) {
            console.log('details saved successfully',savingDetails);
            return res.status(savingDetails.code).send({data: savingDetails.data});
        }
        console.log('details not saved,check again');
        return res.status(savingDetails.code).send({msg: savingDetails.msg});
    } catch(err) {
        console.log('something wrong...',err);
    } 
})

app.get('/getBusiness', async (req, res) => {
    try {
        if(Object.keys(req.body).length == 0) {
            console.log('user does not have sufficiant details to login');
            return res.status(400).send({msg: 'you have insufficient details to login'});
        }
        if(!req.body.email || !req.body.password) {
            return res.status(400).send("please provide email and password")
        }
        let loginBusinessPage = await read(req.body)
        if (loginBusinessPage.code == 200) {
            console.log("user logged in successfully",loginBusinessPage)
            return res.status(loginBusinessPage.code).send({msg: 'you logged in successfully',data: loginBusinessPage.data})
        }
        res.status(loginBusinessPage.code).send({msg: loginBusinessPage.msg})
    } catch(err) {
        console.log('facing issue...',err);
    }
})

app.patch('/updateBusiness',middleware, async (req, res) => {
    try{ 
        if(Object.keys(req.body).length == 0) {
            console.log('user does not have sufficiant details to update');
            return res.status(400).send({msg: 'come with proper details to update '});
        }
        let updatingBusinessPage = await update(req.body)
        if(updatingBusinessPage.code == 200) {
            console.log('business page details updated');
            return res.status(updatingBusinessPage.code).send({msg: 'business page details updated successfully',data: updatingBusinessPage.data});
        }
        console.log('business details did not updated');
        res.status(updatingBusinessPage.code).send({msg: updatingBusinessPage.msg});
    } catch(e) {
        console.log('something is wrong',e);
    }
})

app.get('/deleteBusiness',middleware, async (req, res) => {
    try {
        if(Object.keys(req.body).length == 0) {
            console.log('user does not have sufficiant details to delete page');
            return res.status(400).send({msg: 'come with proper details to delete your page'});
        }
        let deletingBusinessPage = await deletePage(req.body);
        if(deletingBusinessPage.code == 200) {
            console.log('user page has been deleted successfully');
            return res.status(deletingBusinessPage.code).send({msg: deletingBusinessPage.msg});
        }
        console.log('your page did not deleted yet')
        return res.status(deletingBusinessPage.code).send({msg: deletingBusinessPage.msg});
    } catch(e) {
        console.log('something wrong here',e);
    }
})

module.exports = app;