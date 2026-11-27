const express = require('express');
const router = express.Router();
const accountController = require('../Controllers/accountController');
const { validateRegister, validateLogin } = require('../Validators/accountValidator');
const authenticate = require('../Middleware/authenticate');

router.post('/register', validateRegister, accountController.handleRegister);
router.post('/login', validateLogin, accountController.handleLogin);
router.post('/logout', accountController.handleLogout);
router.get('/me', authenticate, accountController.handleCurrentUser);

module.exports = router;