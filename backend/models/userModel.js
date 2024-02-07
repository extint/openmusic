const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    friendCount: Number,
    likedSongs: Array,
    recentSongs: [{
        songId: {
            type: String,
            required: true
        },
        timeAdded:{
            type: Number,
            required: true
        }
    }],
    friends: Array,
    artistsFollowed: Array,//of Artist Ids(from spotify)
    recentArtists: [{
        artistId: {
            type: String,
            required: true
        },
        timeAdded: {
            type: Number,
            required: true
        }
    }],
    playlists: Array, //of Playlist names
    songsPlayed:[{
        songId: {
            type: String,
            required: true
        },
        lastPlayed:{
            type: Number,
            required: true
        },
        playCount:{
            type:Number,
            required: true,
            default: 0
        }
    }]

})


UserSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 12);
});

const UserCollection = mongoose.model('user', UserSchema)

module.exports = UserCollection