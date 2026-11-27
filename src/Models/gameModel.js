const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    short_description: String,
    genre: { type: String, required: true },
    platform: String,
    publisher: String,
    developer: String,
    release_date: String,
    price: { type: Number, default: 150 }
});

module.exports = mongoose.model('Game', gameSchema);



