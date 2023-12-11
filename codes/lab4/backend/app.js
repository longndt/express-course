var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//3A. declare router (1 collection => 1 router)
var categoryRouter = require('./routes/category');  //location: routes/category.js
var productRouter = require('./routes/product');    //location: routes/product.js
var authRouter = require('./routes/auth');
var apiRouter = require('./routes/api');

var app = express();

//import "cors" library
var cors = require('cors');
//enable cors for api exchange
app.use(cors());

//import "express-session" library
var session = require('express-session');
//set session timeout
const timeout = 10000 * 60 * 60 * 24;  // 24 hours (in milliseconds)
//config session parameters
app.use(session({
  secret: "practice_makes_perfect",  // Secret key for signing the session ID cookie
  resave: false,                     // Forces a session that is "uninitialized" to be saved to the store
  saveUninitialized: true,           // Forces the session to be saved back to the session store
  cookie: { maxAge: timeout },
}));

//1. config mongoose library (connect and work with database)
//1A. import library
var mongoose = require('mongoose');
//1B. set mongodb connection string
//Note 1: "web" is database name
//Note 2: change "localhost" to "127.0.0.1" if gets error
var database = "mongodb://localhost:27017/web";

//1C. connect to mongodb
mongoose.connect(database)
  .then(() => console.log('connect to db succeed !'))
  .catch((err) => console.log('connect to db failed. Error: ' + err));

//2. config body-parser library (get data from client-side)
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//make session value available in view
//IMPORTANT: put this before setting router url
app.use((req, res, next) => {
  res.locals.username = req.session.username;
  next();
});

app.use('/', indexRouter);
//3B. declare web URL of routers
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/auth', authRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

