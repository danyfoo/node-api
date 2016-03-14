/**
 * Created by danyfu on 3/13/16.
 */

module.exports = function(app, express){
    "use strict";
    var basicRouter = express.Router();

    basicRouter.get('/', function(req, res){
        res.send('Welcome to the homepage!');
    });

    return basicRouter;
};