const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    imageLink: {
        type: String,
        required: true
    },
    pageLink: {
        type: String,
        required: true
    }
});

const Game = mongoose.model('game', gameSchema);

module.exports = Game;