module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;     //be used to redirect to last known page when logged in
        req.flash('error', 'Must be logged in.');
        return res.redirect('/')
    }
    next();
}