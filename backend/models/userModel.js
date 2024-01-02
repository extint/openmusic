const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    EmailId: {
        type: String,
        required: true
    },

    ProfilePhotoFilePath: String,//not sure

    FriendCount: Number,
    RecentSongs: Array,
    Friends: Array,
    Artistsfollowed: Array,//of Artist Ids(from spotify)
    Playlist: Array, //of Playlist ids


})

const UserCollection = mongoose.model('user', UserSchema)

module.exports = UserCollection