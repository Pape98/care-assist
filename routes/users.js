/*
    ROUTING MODEL for Users (Caretakers)
*/

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var moment = require('moment');
// var flash = require('connect-flash');
// var app = express();
// app.use(flash());

const {
    ensureAuthenticated
} = require('../config/auth');

// User model
const User = require('../models/User');

// TODO: ADMIN ONLY
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('pages/user/index');
// });


// TODO: ADMIN ONLY
// /* SHOW individual user */
// router.get('/:id', function(req, res, next) {
//   res.render('pages/user/show');
// });


// GET Register Page
router.get('/register', (req, res) => res.render('register'));

/* GET home page */
router.get('/home', ensureAuthenticated, function (req, res, next) {
    var date = moment().format('MMMM Do YYYY');
    res.render('pages/users/home', {
        date: date
    });
});

/* GET settings page. */
router.get('/settings', function (req, res, next) {
    res.render('pages/users/profile');
});

/* GET reminder page. */
router.get('/reminders', function (req, res, next) {
    res.render('pages/users/reminder');
});


/* 
    Register Handle
    -- Submit information through POST
*/
router.post('/register', (req, res) => {
    // Information access
    const {
        first_name,
        last_name,
        email,
        password,
        password2
    } = req.body;

    const newUser = new User({
        first_name,
        email,
        password
    });
    // Hash user password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Assign user password as hashed password 
            newUser.password = hash;
            // Insert user into DB
            // TODO: Reassign to Redis
            newUser
                .save()
                .then(user => {
                    // Redirect to login page
                    res.redirect('/login');
                })
                .catch(err => console.log(err));
        });
    });
});


/*
    Login Handle
    -- Submit information through POST
*/
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        // Redirects on both success and fail
        successRedirect: '/login/loader',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


/*
    Logout Handle
    -- Submit through GET
*/
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/logout/loader');
});


module.exports = router;