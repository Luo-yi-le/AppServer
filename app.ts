var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("reflect-metadata")

var indexRouter = require('./routes/index.ts');
var usersRouter = require('./routes/users');

// var entrance= require('./entrance');
var userController= require('./src/service/controller/userController');
var messageController= require('./src/service/controller/messageController');
var gradPhotoController= require('./src/service/controller/gradPhotoController');
var muneController= require('./src/service/controller/muneController');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "content-type");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  if(req.method == "OPTIONS") {
      res.send("200");
  } else {
      next();
  }
});

app.use('/index', indexRouter);
app.use('/users', usersRouter);
// let a=new userController();
app.use('/', userController);
app.use('/', gradPhotoController);
app.use('/', messageController);
app.use('/', muneController);

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
