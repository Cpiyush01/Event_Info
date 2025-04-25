function checkAuth(req, res, next) {
    if (req.session && req.session.userId) {
        res.locals.isAuthenticated = true;
        res.locals.user = {
            name: req.session.userName,
            email: req.session.userEmail,
            goal: req.session.goal,
        };
    } else {
        res.locals.isAuthenticated = false;
    }
    // Optional debugging:
    console.log("isAuthenticated:", res.locals.isAuthenticated);
    next();
}
module.exports = checkAuth;
