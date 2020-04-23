var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
const methodOverride = require('method-override');
const sgMail = require('@sendgrid/mail');

const app = express();

// To allow put and delete methos
app.use(methodOverride("_method"));

// Support parsing of application/json type post data
app.use(bodyParser.json());

// Support parsing of application/x-www-form-urlencoded post data
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require("./config/keys").MongoURI;

// MongoDB connection 
url = 'mongodb://localhost/test';
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
  })
  .then(() => console.log('MongoDB successfully connected...'))
  .catch(err => console.log(err));

// EJS
app.set("view engine", "ejs");

// Bodyparser
app.use(
  express.urlencoded({
    extended: false,
  })
);

// Express Session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Support for flash messages

app.use(flash());

app.use(function (req, res, next) {

  res.locals.success = req.flash("success");
  res.locals.check = req.flash("check");
  res.locals.failure = req.flash("failure");
  res.locals.error = req.flash("error");
  next();
});


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var patientsRouter = require("./routes/patients");
var apiRouter = require("./routes/api");

// Pair Routes with subdirectories
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/patients", patientsRouter);
app.use("/api", apiRouter);

// Define server port
const PORT = process.env.PORT || 5000;
// USING `
app.listen(PORT, console.log(`Server started on port ${PORT}`));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());

app.use(
  sassMiddleware({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true,
  })
);
app.use(express.static(path.join(__dirname, "public")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
