/*
    PASSPORT CONFIG FILE
    This file deals directly with: 
        - Login Authorization
        - User Serialization: Establishing a session for authorized user to view privileged info
*/

const localStrategy = require('passport-local').Strategy;
// TODO: swap to redis
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Model
const User = require('../models/User');

// Login middleware
module.exports = function(passport) {
    passport.use(
        // Using email as "username"
        new localStrategy({ usernameField: 'email' }, (email, password, done) => {
            // Match email
            // TODO: redis function invocation
            User.findOne({ email: email })
                .then(user => {
                    // If no match, return with no user param
                    if (!user) {
                        return done (null, false, { message: 'No account associated with email'});
                    }

                    // If user match, attempt to match password
                    // Compare hashed database password with non-hashed submitted password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        // If matching, return with user param
                        if (isMatch) {
                            // "user" param grants successful login
                            return done (null, user);
                        }
                        else {
                            return done (null, false, { message: 'Password is incorrect'});
                        }
                    });

                })
                .catch(err => console.log(err));
        })
    );

    // Passport Session Establishment Protocols ----
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
    // ---------------------------------------------

}