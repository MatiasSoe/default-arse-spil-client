const gameRepository = require('../Repositories/gameRepository');

const getAllGames = async () => {
    return await gameRepository.findAll();
};

const getGamesGroupedByGenre = async () => {
    const games = await gameRepository.findAll();

    return games.reduce((grouped, game) => {
        const genre = game.genre || 'Andet';
        if(!grouped[genre]) {
            grouped[genre] = [];
        }
        grouped[genre].push(game);
        return grouped;
    }, {});
};

const getGameById = async (id) => {
    const game = await gameRepository.findById(id);
    if(!game) {
        throw new Error('Spillet blev ikke fundet');
    }
    return game; 
};

module.exports = {
    getAllGames, 
    getGamesGroupedByGenre, 
    getGameById
};
 




