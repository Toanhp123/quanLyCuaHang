const express = require('express');

const router = express.Router();
const profileController = require('../controllers/profile.controller');

// [POST] /profile/:username
router.get('/:id', profileController.getProfile);

module.exports = router;
