var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

//USER schema
var UserSchema = new Schema({
    name: String,
    usermane: {
        type: String,
        required: true,
        index: {unique: true}
    },
    password: {
        type: String,
        required: true,
        select: false
    }
});

// hash the password before the user is saved
UserSchema.pre('save', function (next) {
    "use strict";
    var user = this;

    //Hash the password only if the password has been changed or user is new
    if (!user.isModified('password')) return next();

    //generate the hash
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);

        //change the password to the hashed version
        user.password = hash;
        next();
    });
});

//Method to compare a given password with database hash
UserSchema.methods.comparePassword = function (password) {
    "use strict";
    var user = this;
    return bcrypt.compareSync(password, user.password);
};

module.exports = mongoose.model('User', UserSchema);