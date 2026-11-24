const express = require('express');
const gameController = require("../Controllers/gameController");
const router = express.Router();


router.get('/', gameController.handleGetAllGames);
router.get('/store', gameController.getStoreGames);
router.get('/:id', gameController.getGameById);


module.exports = router;