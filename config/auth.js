/*
    Middleware authentication file
    ensureAuthenticated: verifies if a user is logged in
    Using Passport's "isAuthenticated" to verify current user logged in
*/
module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }
}