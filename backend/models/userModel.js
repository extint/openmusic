const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true
    },

    profilePhotoFilePath: String,//not sure

    friendCount: Number,
    likedSongs: Array,
    recentSongs: Array,
    friends: Array,
    artistsFollowed: Array,//of Artist Ids(from spotify)
    playlists: Array, //of Playlist ids


})

const UserCollection = mongoose.model('user', UserSchema)

module.exports = UserCollection