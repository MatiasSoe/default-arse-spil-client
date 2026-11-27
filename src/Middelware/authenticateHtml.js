const jwt = require('jsonwebtoken');
const { AUTH_COOKIE_NAME } = require('../config/auth');
const { verifyAccessToken } = require('../utils/authToken');

module.exports = (req, res, next) => {
    const token = req.cookies && req.cookies[AUTH_COOKIE_NAME];
    if (!token) {
        return redirectToLogin(res);
    }

    try {
        const payload = verifyAccessToken(token);
        if (typeof payload.sub !== 'string' || payload.sub.length === 0) {
            return redirectToLogin(res);
        }

        req.auth = { userId: payload.sub };
        return next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return redirectToLogin(res);
        }
        return next(error);
    }
};

function redirectToLogin(res){
    res.redirect("/login/")
}