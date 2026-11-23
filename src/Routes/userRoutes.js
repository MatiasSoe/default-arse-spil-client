const express = require('express');
const router = express.Router();
const userValidators = require("../validators/userValidator");
const userController = require('../controllers/userController');


router.post('/', userValidators.validateUser, userController.handleCreateuser);


module.exports = router;



