const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    playlistName: {
        type: String,
        required: true
    },
    songIds: {
        type: Array
    }
})

const PlaylistCollection = mongoose.model('playlist', PlaylistSchema);

module.exports = PlaylistCollection;