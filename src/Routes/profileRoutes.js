const express = require('express');
const router = express.Router();
const profileController = require('../Controllers/profileController');


router.get('/:id', profileController.getProfile);
router.patch('/:id', profileController.updateProfile);

module.exports = router;