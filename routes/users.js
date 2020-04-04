/*
    ROUTING MODEL for Users (Caretakers)
*/

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var moment = require('moment');
const {  ensureAuthenticated } = require('../config/auth');
const {  ensureAdmin } = require('../config/admin');

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

// GET Login Page
router.get('/login', (req, res) => res.render('Login'));

// GET Register Page
router.get('/register', ensureAdmin, (req, res) => res.render('register'));

/* GET home page */
router.get('/home',ensureAuthenticated,function(req,res,next){
    var date = moment().format('MMMM Do YYYY');
    res.render('pages/user/home',{date:date});
});

/* GET user profile. */
router.get('/settings', function(req, res, next) {
    res.render('pages/user/profile');
});
  
/* 
    Register Handle
    -- Submit information through POST
*/
router.post('/register', (req, res) => {
    // Information access
    const {name, email, password, password2} = req.body;
    // Validation
    let errorList = [];

    // If errors exist -> push message into errorList detailing issue

    // Check required fields
    if (!name || !email || !password || !password2) {
        errorList.push({ msg: 'Empty field(s)' });
    }

    // Check passwords match
    if (password !== password2) {
        errorList.push({ msg: 'Passwords do not match' });
    }

    // TODO: More strict password requirements
    if (password.length < 6) {
        errorList.push({ msg: 'Password must be at least 6 characters' });
    }

    // If errors exist -> re-render with errors shown
    if (errorList.length > 0) {
        res.render('register', {
            errorList,
            name,
            email,
            password,
            password2
        });
    }
    // Successful validation
    else {
        // Verify no existing user with same email
        User.findOne({ email: email }).then(user => {
            // Existing user -> re-render
            if (user) {
                errorList.push({ msg: 'Email already taken' });
                res.render('register', {
                    errorList,
                    name,
                    email,
                    password,
                    password2
                });
            }
            // Create new user w/ hashed password
            else {
                const newUser = new User ({
                    name,
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
                                res.redirect('/users/login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

/*
    Login Handle
    -- Submit information through POST
*/
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        // Redirects on both success and fail
        successRedirect: '/user/home',
        failureRedirect: '/login',
    })(req, res, next);
});

/*
    Logout Handle
    -- Submit through GET
*/
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});


module.exports = router;