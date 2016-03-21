/**
 * Created by danyfu on 3/13/16.
 */
//Importing controllers
var userCtrl = require('../controllers/users');
//Importing middlewares
var usersMiddleware = require('../middlewares/users');


module.exports = function (app, express) {
    "use strict";
    var apiRouter = express.Router();

    //Middleware for all user request
    apiRouter.use(usersMiddleware.verifyToken);

    apiRouter.get('/', function(req, res){
        res.json({message: 'hooray! welcome to our api!'});
    });

    //Routes to authenticate a user
    apiRouter.post('/authenticate', usersMiddleware.authenticate);

    //Endpoint to get user information
    apiRouter.get('/me', userCtrl.getUserInformation);

    //Routes for Users
    apiRouter.route('/users')
        //create a user
        .post(userCtrl.addUser)
        //get all users
        .get(userCtrl.findAllUsers);

    //Routes for unique User
    apiRouter.route('/users/:user_id')
        //get an user with specific id
        .get(userCtrl.findUserById);

    return apiRouter;
};