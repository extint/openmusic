const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    songId:{
        type: String,
        required: true
    },
    duration_ms:{
        type: Number,
        required: true
    },
    images:[
        {
            url:{
                type: String,
                required: true
            },
            height:{
                type: Number,
                required: true
            },
            width:{
                type: Number,
                required: true
            }
        }
    ],
    artists:[
        {
            name:{
                type: String,
                required: true
            },
            artistId:{
                type: String,
                required: true
            }
        }
    ],
    album:{
        type:{
            type: String,
            required: true
        },
        albumId:{
            type: String,
            required: true
        }
    },
    //Dont store genre temporarily, investigate further
    // genres:[
    //     {
    //         genre:{
    //             type: String,
    //             required: true
    //         }
    //     }
    // ]
    
})

const songCollection = mongoose.model('spotifysong', SongSchema);

module.exports = songCollection;