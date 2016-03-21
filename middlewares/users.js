/**
 * Created by danyfu on 3/13/16.
 */
//Importing dependencies
var jwt = require('jsonwebtoken');
//Importing Models
var User = require('../models/users');

var superSecret = 'cesarComeBirria';

exports.notifyUserConnected = function(req, res, next){
    "use strict";
    //Do Logging
    console.log('Somebody just came to the app');

    //This is where authenticate the users

    next();
};

exports.authenticate = function(req, res){
    "use strict";
    //Find the user
    //Select the name username and password explicitly
    User.findOne({
        username: req.body.username
    }).select('name username password').exec(function(err, user){

        if (err) throw err;

        //no user with that username was found
        if (!user) {
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (user) {
            //check if password matches
            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword){
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password.'
                });
            } else {
                //if user is found and password is right
                //create a token

                var token = jwt.sign({
                    name: user.name,
                    username: user.username
                }, superSecret, {
                    expiresIn: "24h" //expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token',
                    token: token
                });
            }
        }
    });
};

exports.verifyToken = function(req, res, next){
    "use strict";
    //check header or url parameters or post parameters for token
    var token = req.body.token || req.param['token'] || req.headers['x-access-token'];

    //decode token
    if (token) {
        //verifies secret and checks exp
        jwt.verify(token, superSecret, function(err, decoded){
           if (err) {
               return res.statusCode(403).send({
                   success: false,
                   message: 'Failed to autenthicate token.'
               });
           } else {
               //if everything is good, save to request for use in other routers
               req.decoded = decoded;
               next();
           }
        });
    } else {
        //if there is no token
        //return an HTTP response of 403 (access forbidden) and an error message
        return res.status(403).send({
            success: false,
            message: 'No token provided'
        });
    }

    //next() used to be here
};