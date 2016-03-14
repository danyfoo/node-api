/**
 * Created by danyfu on 3/13/16.
 */
var User = require('../models/users');
exports.addUser = function(req, res, next){
    "use strict";
    // create a new instance of the User model
    var user = new User({
        // set the users information (comes from the request)
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });

    //Save the user and check for errors
    user.save(function(err){
        if(err){
            //duplicate entry
            if(err.code == 11000){
                return res.json({
                    success: false,
                    message: 'A user with that username alredy exists.'
                });
            } else {
                return res.send(err);
            }

        } else {
            res.json({message:'User created!'});
        }
    });
};