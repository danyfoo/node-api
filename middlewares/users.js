/**
 * Created by danyfu on 3/13/16.
 */
exports.notifyUserConnected = function(req, res, next){
    "use strict";
    //Do Logging
    console.log('Somebody just came to the app');

    //This is where authenticate the users

    next();
};