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

// GET home page
router.get('/home', ensureAuthenticated, function (req, res, next) {
    var date = moment().format('MMMM Do YYYY');
    res.render('pages/users/home', {
        date: date
    });
});
// GET settings page
router.get('/settings', function (req, res, next) {
    res.render('pages/users/profile', {
        isAdmin: req.user.admin
    })
});

// GET reminder page
router.get('/reminders', function (req, res, next) {
    res.render('pages/users/reminder');
});

// Register Handle
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


// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        // Redirects on both success and fail
        successRedirect: '/login/loader',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});


// Logout Handle
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/logout/loader');
});


// Update Password Handle
router.post('/changePassword', ensureAuthenticated, (req, res) => {
    // Get params
    const {
        current_password,
        new_password,
        confirm_new_password
    } = req.body;
    // Compare new passwords 
    if (new_password == confirm_new_password) {
        // Verify user
        bcrypt.compare(current_password, req.user.password, function(err, isMatch) {
            if (isMatch) {
                // Hash password and update
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


// Reset Password Handle


// Get reset password page


// Change Information Handle
router.post('/changeInfo', ensureAuthenticated, (req, res) => {
    // Get params
    var {
        first_name,
        last_name,
        new_email
    } = req.body;
    // Update email
    if ((new_email != req.user.email) && (new_email.length > 0)) {
        console.log(new_email);
        req.flash('success', 'Confirmation email sent to: ', new_email);
    }
    // Ensure non-empty fields
    if (first_name.length == 0) {
        first_name = req.user.first_name;
    }
    if (last_name.length == 0) {
        last_name = req.user.last_name;
    }
    var info = {
        "first_name": first_name,
        "last_name": last_name
    }
    // Update name
    User.findOneAndUpdate(
        {"email": req.user.email}, 
        {$set: info},
        function(err) {
            if (err) console.log(err);
            req.flash('success', 'Information successfully updated.')
        }
    );
    return res.redirect('/users/settings');
});


module.exports = router;