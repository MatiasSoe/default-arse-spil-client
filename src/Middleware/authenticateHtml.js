const AppError = require('../utils/AppError');
const { authenticateSession } = require('../utils/authSession');

module.exports = (req, res, next) => {
    try {
        const auth = authenticateSession(req);
        req.auth = auth;
        return next();
    } catch (error) {
        if (error instanceof AppError && error.status === 401) {
            return res.redirect('/login/');
        }
        return next(error);
    }
};