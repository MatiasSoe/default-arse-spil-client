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

exports.verifyAccessToken = (token) => jwt.verify(
    token,
    getJwtSecret(),
    { algorithms: ['HS256'] }
);
