const bcrypt = require('bcrypt');
const validator = require('email-validator');

const checkPassword = async (password, passwordHash) => {
    return await bcrypt.compare(password, passwordHash);
};

const createPasswordHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

const checkEmail = (email) => {
    if (!email.trim()) {
        return false;
    }

    if (!validator.validate(email)) {
        return false;
    }

    return true;
};

module.exports = { checkEmail, checkPassword, createPasswordHash };
