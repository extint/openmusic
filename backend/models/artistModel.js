const mongoose = require('mongoose');

const ArtistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    artistId: {
        type: String,
        required: true
    },
    followerCount: {
        type: Number,
        required: true
    },
    genres: [

        {
            type: String,
            required: true
        }
    ],
    images: [
        {
            url: {
                type: String,
                required: true
            },
            height: {
                type: Number,
                required: true
            },
            width: {
                type: Number,
                required: true
            }
        }
    ]
})

const artistCollection = mongoose.model('spotifyartist', ArtistSchema);

module.exports = artistCollection;