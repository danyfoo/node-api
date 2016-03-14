/**
 * Created by danyfu on 3/13/16.
 */
module.exports = function (app, express) {
    "use strict";
    var apiRouter = express.Router();
    apiRouter.get('/', function(req, res){
        res.json({message: 'hooray! welcome to our api!'});
    });
    return apiRouter;
};