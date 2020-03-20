var createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
const session = require('express-session');
// var passport = require('passport');


const app = express();

// DB Config
const db = require('./config/keys').MongoURI;

// MongoDB connection 
// TODO: Replace with Redis connection
mongoose.connect(db, { useNewUrlParser: true})
  .then(() => console.log('MongoDB successfully connected...'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
// var bodyParser = require('body-parser');
app.use(express.urlencoded({ extended: false }))

// Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var authRouter = require('./routes/auth')(passport);
// Pair Routes with subdirectories
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/auth', authRouter)


// Define server port
const PORT = process.env.PORT || 5000;
// USING `
app.listen(PORT, console.log(`Server started on port ${PORT}`));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


// app.use(session({
//   secret: 'sessionSecret',
//   resave:false,
//   saveUninitialized:false
// }))
// app.use(passport.initialize())
// app.use(passport.session())



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;