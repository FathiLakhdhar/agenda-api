var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var assert = require('assert');
var mongoose= require('mongoose');

var index = require('./routes/index');
var auth = require('./routes/auth');
var users = require('./routes/users');
var agendas = require('./routes/agendas');
var reserve = require('./routes/reserve');

var crossMiddleware = require('./middlewares/cross.middleware');
var tokenMiddleware = require('./middlewares/token.middleware');
var databaseMiddleware = require('./middlewares/database.middleware');

mongoose.Promise = global.Promise;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// middleware cross
app.use(crossMiddleware);
// middleware connect database
var url = 'mongodb://localhost:27017/calendly';
app.use(databaseMiddleware(url));


// Routes
app.use('/', index);
app.use('/api/auth', auth);

// middleware token authorization
app.use(tokenMiddleware);

app.use('/api/users', users);
app.use('/api/agendas', agendas);
app.use('/api/reserve', reserve);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.json({
    errors : err.errors,
    'message': err.message
  });
});

module.exports = app;
