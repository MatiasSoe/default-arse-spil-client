const express = require('express');
const router = express.Router();
const userValidators = require("../Validators/userValidator");
const userController = require('../Controllers/userController');
const {validateId} = require("../Middelware/validateUser");


// router.post('/', validateUserData,userValidators.validateUser, userController.handleCreateUser);
router.get('/', userController.handleGetAllUsers);
router.get('/:id', validateId,userController.handleGetUserById);
router.put('/:id', validateId, userValidators.validateUser, userController.handleUpdateUser);
router.delete('/:id', validateId,userValidators.validateUser, userController.handleDeleteUser);


module.exports = router;
