/*
    Middleware file to authenticate if a user has associated reset token
*/
module.exports = {
    ensureReset: function(req, res, next) {
        // TODO: token system
        if(req.isAuthenticated()) {
            return next();
        }
        res.redirect('/users/resetRequest');
    }
}