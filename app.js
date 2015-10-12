var subdomain = require('express-subdomain');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var landingPageRoutes = require('./landing-page/routes/index');
var webappRoutes = require('./webapp/server/routes/index');

var app = express();

var hbs = require('hbs');
hbs.registerHelper('isLocal', function(options){
  if(app.get('env') === 'development'){
    return options.fn(this);
  }
});

var compression = require('compression');
app.use(compression());

// view engine setup
app.set('views', path.join(__dirname, 'landing-page/views'));
app.set('view engine', 'hbs');

app.use(favicon(__dirname + '/landing-page/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'landing-page/public')));

app.use(subdomain('app', webappRoutes));
app.use('/', landingPageRoutes);


//app.use('/', webappRoutes); // I switch this on localhost because subdomains dont work for me

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  //mongoose.connect('mongodb://localhost:27017/autora_lp');
  mongoose.connect('mongodb://autora:autora111111@ds043012.mongolab.com:43012/heroku_app35869958');

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

if (app.get('env') === 'production') {
  mongoose.connect('mongodb://autora:autora111111@ds043012.mongolab.com:43012/heroku_app35869958');
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
