const { checkAccessToken } = require('../middlewares/auth.middleware');

const express = require('express');
const accountController = require('../controllers/account.controller');

const router = express.Router();

// [GET] /account
router.get('/', checkAccessToken, accountController.getAllAccount);

module.exports = router;
