const { verifyToken } = require('../utils/token.util');
const { checkEmail } = require('../utils/validateUser.util');
const { TokenName, TokenType } = require('../configs/constants.config');

const validateUserLogin = (req, res, next) => {
    const { username, password } = req.body;

    if (!username.trim()) {
        return res.status(400).json({ message: 'Missing username' });
    }

    if (!password.trim()) {
        return res.status(400).json({ message: 'Missing password' });
    }

    if (username.trim().length < 6) {
        return res.status(400).json({
            message: 'Username length must have more than 5 character',
        });
    }

    if (password.trim().length < 6) {
        return res.status(400).json({
            message: 'Password  length must have more than 5 character',
        });
    }

    next();
};

const validateUserRegister = (req, res, next) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        address: req.body.address,
        birthday: req.body.birthday,
        phoneNumber: req.body.phoneNumber,
    };

    if (!user.username.trim()) {
        return res.status(400).json({ message: 'Missing username' });
    }

    if (!user.password.trim()) {
        return res.status(400).json({ message: 'Missing password' });
    }

    if (!user.firstName.trim()) {
        return res.status(400).json({ message: 'Missing first name' });
    }

    if (!user.lastName.trim()) {
        return res.status(400).json({ message: 'Missing last name' });
    }

    if (checkEmail(user.email) === false) {
        return res.status(400).json({ message: 'Email is incorrect format' });
    }

    if (!user.address.trim()) {
        return res.status(400).json({ message: 'Missing address' });
    }

    if (!user.birthday.trim()) {
        return res.status(400).json({ message: 'Missing birthday' });
    }

    if (!user.phoneNumber.trim()) {
        return res.status(400).json({ message: 'Missing phone number' });
    }

    if (user.username.trim().length < 6) {
        return res.status(400).json({
            message: 'Username length must have more than 5 character',
        });
    }

    if (user.firstName.trim().length < 2) {
        return res.status(400).json({
            message: 'First name length must have more than 1 character',
        });
    }

    if (user.lastName.trim().length < 2) {
        return res.status(400).json({
            message: 'Last name length must have more than 1 character',
        });
    }

    if (user.address.trim().length < 6) {
        return res.status(400).json({
            message: 'Address length must have more than 5 character',
        });
    }

    if (user.password.trim().length < 6) {
        return res.status(400).json({
            message: 'Password length must have more than 5 character',
        });
    }

    if (user.phoneNumber.trim().length < 11) {
        return res.status(400).json({
            message: 'Phone number length must have more than 10 character',
        });
    }

    req.user = user;

    next();
};

const checkAccessToken = (req, res, next) => {
    const accessToken = {
        payload: req.cookies[TokenName.ACCESS],
        type: TokenType.ACCESS,
    };

    if (!accessToken.payload) {
        return res.status(401).json({
            message: 'Access token had expired',
        });
    }

    try {
        const decoded = verifyToken(accessToken);

        req.user = decoded;

        next();
    } catch (err) {
        next(err);
    }
};

const checkRefreshToken = (req, res, next) => {
    const refreshToken = {
        payload: req.cookies[TokenName.REFRESH],
        type: TokenType.REFRESH,
    };

    if (!refreshToken.payload) {
        return res.status(401).json({
            message: 'Refresh token does not have payload',
        });
    }

    if (!refreshToken.type) {
        return res.status(401).json({
            message: 'Refresh token does not have type',
        });
    }

    if (
        refreshToken.type !== TokenType.ACCESS &&
        refreshToken.type !== TokenType.REFRESH
    ) {
        return res.status(401).json({
            message: 'This type of token is not supported for refresh token',
        });
    }

    try {
        const decoded = verifyToken(refreshToken);

        req.user = decoded;

        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    checkAccessToken,
    checkRefreshToken,
    validateUserLogin,
    validateUserRegister,
};
