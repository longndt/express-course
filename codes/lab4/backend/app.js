var express = require('express');

var apiRouter = require('./routes/api');

var app = express();

//import "cors" library
var cors = require('cors');

app.use(cors());

var mongoose = require('mongoose');
var database = "mongodb://localhost:27017/web";
mongoose.connect(database)
  .then(() => console.log('connect to db succeed !'))
  .catch((err) => console.log('connect to db failed. Error: ' + err));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

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

