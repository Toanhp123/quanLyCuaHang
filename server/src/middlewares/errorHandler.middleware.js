const {
    TokenStatus,
    CookieStatus,
    AccountStatus,
} = require('../configs/constants.config');

const AppError = require('../utils/errorCustom.util');

const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        const handledErrorCodes = [
            TokenStatus.EXPIRED,
            TokenStatus.INVALID,
            TokenStatus.INCORRECT_FORMAT,
            CookieStatus.ERROR_SIGN,
            AccountStatus.ERROR,
            AccountStatus.NOT_FOUND,
            AccountStatus.NOT_ACTIVE,
        ];

        if (handledErrorCodes.includes(err.errorCode)) {
            return res.status(err.statusCode).json({ message: err.message });
        }

        // Xử lý lỗi không nằm trong danh sách trên
        return res
            .status(500)
            .json({ message: 'Something went wrong: ' + err.message });
    } else {
        return res
            .status(500)
            .json({ message: 'Server error: ' + err.message });
    }
};

module.exports = errorHandler;
