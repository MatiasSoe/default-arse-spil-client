const UserGame = require('../Models/userGameModel');

exports.findOwnedGamesByUserId = async (userId) => {
    return await UserGame.find({ user_id: userId })
        .populate('game_id')
        .sort({ purchasedAt: -1 }); //-1 sortere dem i faldende (desc)
};