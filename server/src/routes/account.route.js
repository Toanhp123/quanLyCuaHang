const { checkAccessToken } = require('../middlewares/auth.middleware');

const express = require('express');
const accountController = require('../controllers/account.controller');

const router = express.Router();

// [GET] /account/:username
// TODO: Remember to add checkAccessToken middleware
router.get(
    '/:username',
    // checkAccessToken,
    accountController.getAccountByUsername,
);

// [GET] /account
// TODO: Remember to add checkAccessToken middleware
router.get(
    '/',
    // checkAccessToken,
    accountController.getAccountByCondition,
);
module.exports = router;
