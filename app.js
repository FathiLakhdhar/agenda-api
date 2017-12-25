var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var assert = require('assert');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var index = require('./routes/index');
var auth = require('./routes/auth');
var users = require('./routes/users');
var agendas = require('./routes/agendas');

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
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(function (req, res, next) {
  // Connection URL
  var url = 'mongodb://localhost:27017/calendly';

  mongoose.connect(url,{useMongoClient : true}, function(err, database){
    assert.equal(null, err);
    console.log('Connected successfully to server mongodb');
    next();
  });

});



// Routes
app.use('/', index);
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/agendas', agendas);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  //res.locals.message = err.message;
  //res.locals.error = req.app.get('env') === 'development' ? err : {};

  console.log(err);

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  res.json({
    errors : err,
    'message': err.message
  });
});

module.exports = app;
