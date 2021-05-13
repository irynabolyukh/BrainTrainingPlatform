const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Будь ласка, введіть назву.']
    },
    description: {
        type: String,
        required: [true, 'Будь ласка, введіть опис.']
    },
    level: {
        type: String,
        required: [true, 'Будь ласка, введіть рівень.']
    },
    imageLink: {
        type: String,
        required: [true, 'Будь ласка, введіть посилання на зображення.']
    },
    pageLink: {
        type: String,
        required: [true, 'Будь ласка, введіть посилання на сторінку.']
    }
});

const Game = mongoose.model('game', gameSchema);

module.exports = Game;