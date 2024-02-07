const songCollection = require('../models/songModel');
const artistCollection = require('../models/artistModel');

module.exports.shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

module.exports.saveTracks = async (tracks) => {
    let _out = []
    for (const track of tracks) {
        const check = await songCollection.findOne({songId: track.id});
        if(check){
            _out.push(check);
            continue;
        }
        let _artists = []
        for(const artist of track.artists){
            _artists.push({
                name: artist.name,
                artistId: artist.id
            })
        }
        const song = {
            name: track.name,
            songId: track.id,
            duration_ms: track.duration_ms,
            images:track.album.images,
            artists: _artists,
            album:{
                type: track.album.album_type,
                albumId: track.album.id
            }
        }
        _out.push(song);
        const res = await songCollection.create(song);
        // console.log(res);
    }
    return _out;
}

module.exports.saveArtists = async (artists) => {
    let out = [];
    for (const artist of artists) {
        // console.log(track);
        // console.log("Artists",track.artists);
        const info = {
            name: artist.name,
            artistId: artist.id,
            followerCount: artist.followers.total,
            genres: artist.genres,
            images: artist.images
        }
        try {
            const res = await artistCollection.create(info);
            console.log(res, "success");
            out.push(res);
        }
        catch (err) {
            console.log(err);
            return;
        }
    
    }
    return out;
}