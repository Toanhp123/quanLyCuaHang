const { NODE_ENV } = require('../configs/env.config');
const { CookieStatus } = require('../configs/constants.config');

const AppError = require('../utils/errorCustom.util');

const createCookie = (res, cookieName, token, httpOnly, expireTime) => {
    try {
        return res.cookie(cookieName, token, {
            httpOnly: httpOnly,
            maxAge: expireTime,
            sameSite: 'strict',
            secure: NODE_ENV === 'production',
        });
    } catch (err) {
        throw new AppError('Failed to set auth cookie', {
            errorCode: CookieStatus.ERROR_SIGN,
            statusCode: 500,
        });
    }
};

const deleteCookie = (res, cookieName, httpOnly) => {
    try {
        return res.clearCookie(cookieName, {
            httpOnly: httpOnly,
            sameSite: 'strict',
            secure: NODE_ENV === 'production',
        });
    } catch (err) {
        throw new AppError('Failed to delete auth cookie', {
            errorCode: CookieStatus.ERROR_SIGN,
            statusCode: 500,
        });
    }
};

module.exports = {
    createCookie,
    deleteCookie,
};
