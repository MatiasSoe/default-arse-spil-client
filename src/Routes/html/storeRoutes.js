const express = require('express');
const router = express.Router();
const authenticateHtml = require('../../Middleware/authenticateHtml');

const storeController = require('../../Controllers/storeController');

router.get('/', authenticateHtml, storeController.getStorePage);

module.exports = router;