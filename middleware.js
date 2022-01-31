const jwt = require('jsonwebtoken');
const { businessModel } = require('./model/businessModel');

var middleware = async (req, res, next) => {
    try {
        if(!req.header("token"))  {
            console.log('token not received from user');
            return res.status(500).send({msg: 'give us token'});
        }
        await jwt.verify(req.header("token"),'abc123');
        var searchTokenFromDb = await businessModel.findOne({token: req.header("token")});
        if(!searchTokenFromDb) {
            console.log('token did not matched');
            return res.status(404).send({msg: 'token did not matched ,get back with right token'});
        }
        next();
    } catch(err) {
        console.log('some error is here',err);
        if(err.name == 'TokenExpiredError') {
            return res.status(500).send({msg: 'token expired'});
        }
        if(err.name == 'JsonWebTokenError') {
            return res.status(500).send({msg: 'token malformed'});
        }
        res.status(404).send({msg: 'server errrorrr'});
    }
    }

module.exports = { middleware };