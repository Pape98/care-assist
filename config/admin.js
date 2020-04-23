/*
    Middleware file to authenticate if a user is logged WITH admin credentials
    Using Passport's "isAuthenticated" to verify current user logged in
*/
module.exports = function (filePath) {
    return function(req, res, next) {
        if(req.isAuthenticated()) {
            if(req.user.admin == true) {
                console.log("Is admin");
                return next();
            }
            console.log("Not admin");
            return res.redirect(filePath);

        }
        console.log("Not logged in");
        res.redirect('/login');
    }
}