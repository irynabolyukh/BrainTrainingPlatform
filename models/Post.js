const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    header: {
        type: String,
        required: [true, 'Будь ласка, введіть назву.']
    },
    description: {
        type: String,
        required: false
    },
    imageLink: {
        type: String,
        required: false
    },
    videoLink: {
        type: String,
        required: false
    },
    dayUpdated: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Post = mongoose.model('post', postSchema);

module.exports = Post;