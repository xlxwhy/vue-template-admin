var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');

var app = express();


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*************************************************************************
** Cookie
**************************************************************************/
//app.use(cookieParser());

/*************************************************************************
** Session
**************************************************************************/
/*app.use(session({
  secret: 'yog',
  resave: false,
  saveUninitialized: true,
  name: "JSESSIONID",
}));*/

/*************************************************************************
** Filters
**************************************************************************/

//var filters = require('./app-filters');
//filters(app);

/*************************************************************************
** Router
**************************************************************************/

var router = express.Router();
require('./app-routers.js')(router);
app.use('/', router);

 

/*************************************************************************
** 静态资源
**************************************************************************/
app.use(express.static(path.join(__dirname, 'public')));

let port = 9000
app.listen(port, function () {
  console.log(`server start! port=[${port}]`);
});

module.exports = app;

