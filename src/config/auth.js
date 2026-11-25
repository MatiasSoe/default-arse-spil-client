const AUTH_COOKIE_NAME = 'auth_token';
const AUTH_TOKEN_TTL_SECONDS = 60 * 60;

const getJwtSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error('JWT_SECRET skal være konfigureret med mindst 32 tegn');
    }

    return secret;
};

const assertJwtSecretConfigured = () => {
    getJwtSecret();
};

const getAuthCookieOptions = () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: AUTH_TOKEN_TTL_SECONDS * 1000
});

module.exports = {
    AUTH_COOKIE_NAME,
    AUTH_TOKEN_TTL_SECONDS,
    assertJwtSecretConfigured,
    getAuthCookieOptions,
    getJwtSecret
};
