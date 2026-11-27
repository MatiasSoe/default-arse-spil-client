const mongoose = require('mongoose');

const userGameSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        game_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Game',
            required: true
        },
        purchasedAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        collection: 'user_games'
    }
);

// Sikrer at den samme bruger ikke kan eje det samme spil to gange
userGameSchema.index({ user_id: 1, game_id: 1 }, { unique: true });

module.exports = mongoose.model('UserGame', userGameSchema);