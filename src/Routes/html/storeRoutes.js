const express = require('express');
const router = express.Router();
const authenticateHtml = require('../../Middelware/authenticateHtml');

const storeController = require("../../Controllers/html/storeController");

router.get('/', authenticateHtml, storeController.getStorePage);

module.exports = router;
