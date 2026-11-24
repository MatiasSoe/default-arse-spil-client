const gameService = require('../Services/gameService');

exports.handleGetAllGames = async (req, res, next) => {
    try {
        const games = await gameService.getAllGames();
        res.status(200).json(games)
    } catch (error) {
        next(error);
    }
}

exports.getStoreGames = async (req, res, next) => {
    try {
        const games = await gameService.getStoreGames();
        res.status(200).json(games);
    } catch (error) {
        next(error);
    }
}

exports.getGameById = async (req, res, next) => {
    try{
        const game = await gameService.getGameById(req.params.id);
        res.status(200).json(game);
    } catch (error) {
        next(error); 
    }
}





