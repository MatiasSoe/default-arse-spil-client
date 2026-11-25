const accountService = require('../Services/accountService');
const authToken = require('../utils/authToken');
const {
    AUTH_COOKIE_NAME,
    getAuthCookieOptions
} = require('../config/auth');

exports.handleRegister = async (req, res, next) => {
    try {
        const user = await accountService.register(req.body);
        res.status(201).json({
            message: 'Bruger oprettet',
            user // Returner den oprettede bruger uden password
        });
    } catch (error) {
        next(error);
    }
};

exports.handleLogin = async (req, res, next) => {
    try {
        const user = await accountService.login(req.body);
        const token = authToken.createAccessToken(user.id);
        res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());
        res.status(200).json({
            message: 'Login gennemført',
            user
        });
    } catch (error) {
        next(error);
    }
};

exports.handleLogout = (_req, res) => {
    const { maxAge, ...clearCookieOptions } = getAuthCookieOptions();
    res.clearCookie(AUTH_COOKIE_NAME, clearCookieOptions);
    res.status(200).json({ message: 'Logget ud' });
};

exports.handleCurrentUser = async (req, res, next) => {
    try {
        const user = await accountService.getAuthenticatedUser(req.auth.userId);
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};