var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// Middleware setup (order matters!)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
var superAdminRouter = require('./Super_Admin/routes/superAdmin');
var companyRouter = require('./Super_Admin/routes/company');

app.use('/api/superadmin', superAdminRouter);
app.use('/api/companies', companyRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;


