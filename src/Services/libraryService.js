const userRepository = require('../Repositories/userRepository');
const userGameRepository = require('../Repositories/userGameRepository');
const AppError = require('../utils/AppError');

const toOwnedGame = (userGame) => ({
    id: userGame.game_id._id,
    gameId: userGame.game_id.id,
    title: userGame.game_id.title,
    thumbnail: userGame.game_id.thumbnail,
    genre: userGame.game_id.genre,
    platform: userGame.game_id.platform,
    purchasedAt: userGame.purchasedAt
});

exports.getOwnedGames = async (userId) => {
    const user = await userRepository.getUserById(userId);
    if (!user) {
        throw new AppError('Brugeren blev ikke fundet', 404);
    }

    const userGames = await userGameRepository.findOwnedGamesByUserId(userId);

    // Filtrér evt. slettede spil fra (hvor populate giver null)
    return userGames
        .filter((entry) => entry.game_id)
        .map(toOwnedGame);
};