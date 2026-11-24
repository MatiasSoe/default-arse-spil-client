const express = require('express');
const router = express.Router();
const userValidators = require("../validators/userValidator");
const userController = require('../controllers/userController');
const {validateId, validateUserData} = require("../Middelware/validateUser");


router.post('/', validateUserData,userValidators.validateUser, userController.handleCreateuser);
router.get('/', userController.handleGetAllUsers);
router.get('/:id', validateId,userController.handleGetUserById);
router.put('/:id', validateId, userValidators.validateUser, userController.handleUpdateUser);
router.delete('/:id', validateId,userValidators.validateUser, userController.handleDeleteUser);


module.exports = router;



