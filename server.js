//BASE SETUP

//CALL TO PACKAGES
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose');

var port = process.env.PORT || 8080;

//Conection URI to the mongodb database
mongoose.connect('mongodb://localhost:27017/demo');

//APP ROUTERS
var apiRouter = require('./routes/apiRoutes')(app, express);
var basicRouter = require('./routes/basicRoutes')(app, express);

//APP CONFIGURATION
//Use body parser so we can grab information from POST request
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//configure our app to handle CORS request
app.use(function(req, res, next){
    "use strict";
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

//log all request to console
//app.use(morgan('dev'));

//SET ROUTERS TO APP
app.use('/', basicRouter);
app.use('/api', apiRouter);

app.listen(port);
console.log('Visit me at http://localhost:'+port);