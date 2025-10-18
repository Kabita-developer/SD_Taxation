var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors');


var app = express();

app.use(cors());
// Middleware setup (order matters!)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
var superAdminRouter = require('./Super_Admin/routes/superAdmin');
var companyRouter = require('./Super_Admin/routes/company');
var adminRouter = require('./Admin/routes/admin');
var employeeRouter = require('./Employees/routes/employee');
var hrRouter = require('./HR/routes/adminHr');
var unifiedRouter = require('./routes/unified');

app.use('/api/superadmin', superAdminRouter);
app.use('/api/companies', companyRouter);
app.use('/api/superadmin', adminRouter);
app.use('/api/admin', adminRouter);
app.use('/api/admin', employeeRouter);
app.use('/api/employees', employeeRouter);
app.use('/api/admin', hrRouter);
app.use('/api/hr', hrRouter);

// Unified routes (works for all user types)
app.use('/api', unifiedRouter);

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;


