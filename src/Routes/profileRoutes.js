const express = require('express');
const router = express.Router();
const profileController = require('../Controllers/profileController');

const authenticate = require('../Middleware/authenticate');
const { validateId } = require('../Middleware/validateUser');
const { validateUpdateData } = require('../Validators/profileValidator');
const { validateLibraryQuery } = require('../Validators/libraryValidator');

router.get('/me', authenticate, profileController.handleGetMyProfile);
router.patch('/me', authenticate, validateUpdateData, profileController.handleUpdateProfile);
router.get('/me/games', authenticate, validateLibraryQuery, profileController.handleGetMyGames);
router.get('/:id', validateId, profileController.handleGetProfileById);

module.exports = router;
