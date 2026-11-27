const AppError = require('../utils/AppError');
const { authenticateSession } = require('../utils/authSession');

module.exports = (req, res, next) => {
    try {
        const auth = authenticateSession(req);
        req.auth = auth;
        return next();
    } catch (error) {
        if (error instanceof AppError && error.status === 401) {
            return res.status(401).json({ error: error.message });
        }
        return next(error);
    }
};