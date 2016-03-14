/**
 * Created by danyfu on 3/13/16.
 */

//Importing middlewares
var usersMiddleware = require('../middlewares/users');

module.exports = function (app, express) {
    "use strict";
    var apiRouter = express.Router();

    //Middleware for all user request
    apiRouter.use(usersMiddleware.notifyUserConnected);

    apiRouter.get('/', function(req, res){
        res.json({message: 'hooray! welcome to our api!'});
    });
    return apiRouter;
};