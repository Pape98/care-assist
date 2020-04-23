/*
    Middleware file to authenticate if a user is currently logged in
    Using Passport's "isAuthenticated" to verify current user logged in
*/
module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        req.flash('failure','You need to login first.')
        res.redirect('/login');
    }
}