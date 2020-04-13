/*
    ROUTING MODEL for Users (Caretakers)
*/

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
var moment = require('moment');
const { ensureAuthenticated } = require('../config/auth');

// User model
const User = require('../models/User');

// // GET Register Page
// router.get('/register', (req, res) => res.render('register'));

// GET home page 
router.get('/home', ensureAuthenticated, function (req, res, next) {
    var date = moment().format('MMMM Do YYYY');
    res.render('pages/users/home', {
        date: date
    });
});
// GET settings page. 
router.get('/settings', function (req, res, next) {
    res.render('pages/users/profile', {
        isAdmin: req.user.admin
    })
});

// GET reminder page. 
router.get('/reminders', function (req, res, next) {
    res.render('pages/users/reminder');
});

// Register Handle -- Submit information through POST

router.post('/register', (req, res) => {
    // Information access
    if(req.user.admin != true) {
        console.log("Not admin");
        return;
    }
    const {
        first_name,
        last_name,
        email,
        password,
        password2
    } = req.body;

    const newUser = new User({
        first_name,
        last_name,
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


// Login Handle -- Submit information through POST
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        // Redirects on both success and fail
        successRedirect: '/login/loader',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


// Logout Handle -- Submit through GET

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/logout/loader');
});


// Change Password
router.post('/changePassword', ensureAuthenticated, (req, res) => {
    // Get params
    var {
        current_password,
        new_password,
        confirm_new_password
    } = req.body;
    // Compare new passwords 
    if (new_password == confirm_new_password) {
        // Verify user
        bcrypt.compare(current_password, req.user.password, function(err, isMatch) {
            if (isMatch) {
                // Modify password if user successfully authenticates
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(new_password, salt, (err, hash) => {
                            if (err) throw err; 
                            // Reassign user password
                            User.findOneAndUpdate(
                                {"email": req.user.email}, 
                                {$set: {"password": hash}},
                                function(err) {
                                    if (err) console.log(err);
                                    req.flash('success', 'Password successfully updated.')
                                }
                            );
                            console.log("Password successfully changed");
                        });
                    });
                }); 
            }
            else {
                console.log("Password incorrect");
            }
        });
    }
    else {
        console.log("Passwords don't match");
    } 
    return res.redirect('/users/settings');
});


module.exports = router;