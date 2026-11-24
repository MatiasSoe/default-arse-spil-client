const Game = require('../Models/gameModel');


const findAll = async () => {
    return await Game.find();
};

const findById = async () => {
    return await Game.findOne ({ id: Number(id) });
};

const findByGenre = async () => {
    return await game.find({ genre });
};

module.exports = {
    findAll,
    findById,
    findByGenre
}





