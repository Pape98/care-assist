// Utilize passport for authentication via bcrypt encryption
var passport = require ('passport')
var bcrypt = require ('bcrypt')
const localStrategy = require ('passport-local').Strategy

// DEBUG: Test user
const user = {
    username: 'test',
    passwordHash: 'hashed_password',
    id: 1
}

// Authenticate functionality
passport.use(new localStrategy(
    // Pass in parameters
    (username, password, done) => {
       findUser(username, (err, user) => {
         if (err) {
           return done(err)
         }
   
         // User not found
         if (!user) {
           return done(null, false)
         }
   
         // Always use hashed passwords and fixed time comparison
         bcrypt.compare(password, user.passwordHash, (err, isValid) => {
           if (err) {
             return done(err)
           }
           if (!isValid) {
             return done(null, false)
           }
           return done(null, user)
         })
       })
     }
   ))