module.exports = {
    AccountStatus: {
        NOT_FOUND: 'NOT_FOUND',
        ERROR: 'REGISTER_FAILED',
        NOT_ACTIVE: 'NOT_ACTIVE',
        ALREADY_EXISTS: 'ALREADY_EXISTS',
        WRONG_PASSWORD: 'WRONG_PASSWORD',
    },
    TokenStatus: {
        EXPIRED: 'TOKEN_EXPIRED',
        INVALID: 'TOKEN_INVALID',
        ERROR_SIGN: 'TOKEN_ERROR_SIGN',
        NOT_PROVIDED: 'TOKEN_NOT_PROVIDED',
        INCORRECT_FORMAT: 'TOKEN_INCORRECT_FORMAT',
    },
    TokenName: {
        ACCESS: 'ACCESS_TOKEN',
        REFRESH: 'REFRESH_TOKEN',
    },
    TokenType: {
        ACCESS: 'ACCESS_TOKEN',
        REFRESH: 'REFRESH_TOKEN',
    },
    CookieStatus: {
        EXPIRED: 'COOKIE_EXPIRED',
        INVALID: 'COOKIE_INVALID',
        ERROR_SIGN: 'COOKIE_ERROR_SIGN',
        NOT_PROVIDED: 'COOKIE_NOT_PROVIDED',
        INCORRECT_FORMAT: 'COOKIE_INCORRECT_FORMAT',
    },
};
