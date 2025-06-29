const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_EXPIRES_IN,
    JWT_EXPIRES_DAY_IN,
} = require('../configs/env.config');
const { TokenStatus, TokenType } = require('../configs/constants.config');

const jwt = require('jsonwebtoken');
const AppError = require('./errorCustom.util');

/**
 * Hàm ký access token
 * @param {Object} payload thông tin token
 * @return {Object} access token được ký
 */
const signAccessToken = (payload) => {
    try {
        return jwt.sign(payload, JWT_ACCESS_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
    } catch (error) {
        throw new AppError('Error signing access token', {
            statusCode: 500,
            errorCode: TokenStatus.ERROR_SIGN,
        });
    }
};

/**
 *
 * @param {Object} payload
 * @returns {Object} refresh token được ký
 */
const signRefreshToken = (payload) => {
    try {
        return jwt.sign(payload, JWT_REFRESH_SECRET, {
            expiresIn: JWT_EXPIRES_DAY_IN,
        });
    } catch (error) {
        throw new AppError('Error signing refresh token', {
            statusCode: 500,
            errorCode: TokenStatus.ERROR_SIGN,
        });
    }
};

/**
 * Hàm kiểm tra token access và refresh
 * @param {object} token object chứa thông tin token
 * @return {Boolean}
 */
const verifyToken = (token) => {
    try {
        return (decode = jwt.verify(
            token.payload,
            token.type === TokenType.ACCESS
                ? JWT_ACCESS_SECRET
                : JWT_REFRESH_SECRET,
        ));
    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            throw new AppError('Token is not invalid', {
                statusCode: 403,
                errorCode: TokenStatus.INVALID,
            });
        }
        if (err.name === 'TokenExpiredError') {
            throw new AppError('Token had expired', {
                statusCode: 403,
                errorCode: TokenStatus.EXPIRED,
            });
        } else {
            throw err;
        }
    }
};

module.exports = {
    verifyToken,
    signAccessToken,
    signRefreshToken,
};
