const express = require('express');
const profileController = require('../controllers/profile.controller');

const router = express.Router();

// [POST] /profile/:username
// TODO: Remember to add checkAccessToken middleware
router.get(
    '/:id',
    // checkAccessToken,
    profileController.getProfile,
);

module.exports = router;
