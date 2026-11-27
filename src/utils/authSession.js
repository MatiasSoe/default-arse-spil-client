const AppError = require('./AppError');
const { AUTH_COOKIE_NAME } = require('../config/auth');
const { verifyAccessToken } = require('./authToken');

exports.authenticateSession = (req) => {
    const token = req.cookies && req.cookies[AUTH_COOKIE_NAME];
    if (!token) {
        throw new AppError('Login påkrævet', 401);
    }

    const payload = verifyAccessToken(token);
    if (typeof payload.sub !== 'string' || payload.sub.length === 0) {
        throw new AppError('Ugyldig eller udløbet login-session', 401);
    }

    return { userId: payload.sub };
};
