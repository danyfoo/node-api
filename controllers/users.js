/**
 * Created by danyfu on 3/13/16.
 */
var User = require('../models/users');
exports.addUser = function (req, res) {
    "use strict";
    // create a new instance of the User model
    var user = new User({
        // set the users information (comes from the request)
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
    });

    //Save the user and check for errors
    user.save(function (err) {
        if (err) {
            //duplicate entry
            if (err.code == 11000) {
                return res.json({
                    success: false,
                    message: 'A user with that username already exists.'
                });
            } else {
                return res.send(err);
            }

        } else {
            res.json({message: 'User created!'});
        }
    });
};

exports.findAllUsers = function (req, res) {
    "use strict";
    User.find(function(err, users){
       if(err) res.send(err);

        //return the users
        res.json(users);
    });
};

exports.findUserById = function (req, res) {
    "use strict";
    //Get the User with that id
    User.findById(req.params.user_id, function(err, user){
        if(err) res.send(err);

        //return that user
        res.json(user);
    });
};

exports.updateUser = function (req, res) {
    "use strict";
    //Update the information of a User with that id
    User.findById(req.params.user_id, function(err, user){
        if(err) res.send(err);

        //update the users info if its new
        if(req.body.name) user.name = req.body.name;
        if(req.body.username) user.username = req.body.username;
        if(req.body.password) user.password = req.body.password;

        //save the new information for that user
        user.save(function(err){
           if(err){
               res.send(err);
           } else {
               res.json({ message: 'User updated' });
           }
        });
        //return that user
        res.json(user);
    });
};