const {userModel} = require('./../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

let create = async (data) => {
    try {
        let checkUserExist = await userModel.findOne({email: data.email});
        if(checkUserExist) {
            console.log('email already created ');
            return ({code:404,msg: 'email already exist,try for new'})
        }
        let salt = await bcrypt.genSalt(4);
            var passwordHash = await bcrypt.hash(data.password,salt);
            data.password = passwordHash
        let saveUserDetails = new userModel(data);
        await saveUserDetails.save();
        if(saveUserDetails) {
            return ({code: 200, data: saveUserDetails});
        }
        return ({code: 404,msg: 'user details has issue,did not saved'});
    } catch(e) {
        console.log('found error....',e);
    }
}

let read = async (data) => {
    console.log('user data',data);
    try {
        var searchEmailInDb = await userModel.findOne({email: data.email});
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
        var changeTokenInDb = await userModel.findOneAndUpdate({email: data.email},{$set: {token: token}},{new: true});
        if(!changeTokenInDb) {
            console.log('token not changed in db');
            return({code: 404, msg:'token not changed in db'})
        }
        return({code: 200,  data: changeTokenInDb})
    } catch(e) {
        console.log('some error is here',e);
    } 
}

module.exports = {create, read};