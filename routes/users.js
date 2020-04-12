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
    const {
        current_password,
        new_password,
        confirm_new_password
    } = req.body;
    // Compare new passwords 
    if (new_password == confirm_new_password) {
        // Hash current password and compared to stored, hashed user password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(current_password, salt, (err, hash) => {
                if (err) throw err;
                // Compare current hash with stored user hash
                console.log(req.user.email);
                console.log(req.user.password);
                console.log(hash);
                console.log(current_password);
                if (req.user.password == hash) {
                    // Modify password if user successfully authenticates
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(new_password, salt, (err, hash2) => {
                            if (err) throw err; 
                            // Reassign user password
                            console.log("Password successfully changed");
                            req.user.password = hash2;
                        });
                    });
                }
                else {
                    console.log("Password incorrect");
                }
            });
        });
    }
    else {
        console.log("Passwords don't match");
    } 
    return res.redirect('/users/settings');
});


module.exports = router;