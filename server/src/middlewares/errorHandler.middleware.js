const {
    TokenStatus,
    CookieStatus,
    AccountStatus,
    ProfileStatus,
} = require('../configs/constants.config');

const AppError = require('../utils/errorCustom.util');

const errorHandler = (err, req, res, next) => {
    const isAppError = err instanceof AppError;

    const knownErrorCodes = [
        TokenStatus.EXPIRED,
        TokenStatus.INVALID,
        TokenStatus.INCORRECT_FORMAT,
        CookieStatus.ERROR_SIGN,
        AccountStatus.ERROR,
        AccountStatus.NOT_FOUND,
        AccountStatus.NOT_ACTIVE,
        ProfileStatus.NOT_FOUND,
    ];

    const statusCode = isAppError ? err.statusCode : 500;
    const errorCode =
        isAppError && knownErrorCodes.includes(err.errorCode)
            ? err.errorCode
            : 'UNKNOWN_ERROR';
    const message =
        isAppError && knownErrorCodes.includes(err.errorCode)
            ? err.message
            : 'Something went wrong';

    // Log cho debug
    if (statusCode === 500) {
        console.error('[Server Error]', {
            message: err.message,
            stack: err.stack,
            url: req.originalUrl,
            method: req.method,
            ip: req.ip,
        });
    }

    res.status(statusCode).json({
        status: 'ERROR',
        statusCode,
        errorCode,
        message,
    });
};

module.exports = errorHandler;
