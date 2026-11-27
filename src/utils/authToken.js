const jwt = require('jsonwebtoken');
const {
    AUTH_TOKEN_TTL_SECONDS,
    getJwtSecret
} = require('../config/auth');

exports.createAccessToken = (userId) => jwt.sign(
    {},
    getJwtSecret(),
    {
        algorithm: 'HS256',
        subject: String(userId),
        expiresIn: AUTH_TOKEN_TTL_SECONDS
    }
);

exports.verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, getJwtSecret(), { algorithms: ['HS256'] });
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            throw new AppError('Ugyldig eller udløbet login-session', 401);
        }
        throw error;
    }
};
