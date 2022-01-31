const { businessModel } = require('./../model/businessModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let create = async (data) => {
    try {
        let checkUserExist = await businessModel.findOne({email: data.email});
        if(checkUserExist) {
            console.log('email already created ');
            return ({code:404,msg: 'email already exist,try for new'})
        }
        let salt = await bcrypt.genSalt(4);
            var passwordHash = await bcrypt.hash(data.password,salt);
            data.password = passwordHash
        let saveBusinessDetails = new businessModel(data);
        await saveBusinessDetails.save();
        if(saveBusinessDetails) {
            return ({code: 200,data: saveBusinessDetails});
        }  
        return ({code: 404,msg: 'business details not saved, check again '});
    } catch(e) {
        console.log('facing issue..',e);
    }
}
let read = async (data) => {
    console.log('user data',data);
    try {
        var searchEmailInDb = await businessModel.findOne({email: data.email});
        if(!searchEmailInDb) {
            console.log("user is not registed ");
            return({code: 404, msg:'first register then login again'})
        }
        var bcryptedPassword = await bcrypt.compare(data.password,searchEmailInDb.password);
        if(bcryptedPassword == false) {
            console.log('password not matched');
            return({code: 404, msg: 'password did not matched'})
        }
        console.log('email and password matched');
        var token = jwt.sign({email: data.email},'abc123',{ expiresIn: '12h' });
        var changeTokenInDb = await businessModel.findOneAndUpdate({email: data.email},{$set: {token: token}},{new: true});
        if(!changeTokenInDb) {
            console.log('token not changed in db');
            return({code: 404, msg:'token not changed in db'})
        }
        return({code: 200,  data: changeTokenInDb})
    } catch(e) {
        console.log('some error is here',e);
    }
}
let update = async (data) => {
    try {
        var updateBusinessDetails = await businessModel.findOneAndUpdate({email: data.email},{$set: data},{new: true});
        if(!updateBusinessDetails) {
            return ({code: 404, msg: 'business page details did not updated '})
        }
        return ({code: 200,data: updateBusinessDetails})
    }catch(e) {
        console.log('found error..',e);
    }
}
let deletePage = async (data) => {
    try {
        var deleteBusinessPage = await businessModel.findOneAndRemove({email: data.email});
        if(!deleteBusinessPage) {
            return ({code: 404, msg: 'your page did not deleted'});
        }
        return ({code: 200, msg: 'your page has been deleted..........'});
    }catch(e) {
        console.log('having issue to delete account',e);
    }
}

module.exports = {create, read, update, deletePage}