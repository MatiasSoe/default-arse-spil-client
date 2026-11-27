const UserGame = require('../Models/userGameModel');

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

exports.findOwnedGamesByUserId = async (userId, search) => {
    const populateOptions = { path: 'game_id' };

    if (search) {
        populateOptions.match = {
            title: { $regex: `^${escapeRegex(search)}`, $options: 'i' } //'^' betyder at det er søges på starter med det man søger
        };                                                              //'$options: 'i'' gør at querien ikke er case sensitive
    }                                                                   // 'escapeRegex' undlader speciel tegn såsom *,+

    return await UserGame.find({ user_id: userId })
        .populate(populateOptions)
        .sort({ purchasedAt: -1 }); //-1 sortere dem i faldende (desc)
};
