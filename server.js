var app = require('./express');
var bodyParser = require('body-parser');

// app.set('view engine', 'ejs');

//different package for different passport strategy
//passport-local, passport-facebook..etc

//passport depends on session, session depends on cookie
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//store secret as environment variable
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

// require ("./test/app.ejs");

// var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;

// require ("./test/app.js");

require('./assignment/app');

//lecture
//if not specify the file, will execute index.js file
// require('./lecture/ejs/crud');

// require('./lecture/mongojs');

var application =  {
    "name" : "charterApp",
    "entities" : {
        "boat" : {
            "fields": {
                "brand" : {},
                "length" : {},
                "type": {}
            }
        },
        "crew" : {},
        "booking" : {},
        "user" : {}
    }
};

// require('./lecture/wam')(application);

var port = process.env.PORT || 3000;

app.listen(port);