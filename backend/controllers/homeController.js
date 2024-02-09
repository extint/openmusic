const { getTracks, getArtists, getRecommendedSongs } = require('../utils/spotifyapi');
const userCollection = require('../models/userModel');
const playlistCollection = require('../models/playlistModel');


module.exports.getcontent = async (req, res) => {
    const uname = req.query.userName;
    console.log("uname", uname)
    let likedSongs = [];
    let recentSongs = [];
    let artistsFollowed = [];
    let recommendedSongs = [];
    let playlists = [];
    let topSongs = [];
    const user = await userCollection.findOne({ userName: uname });
    if (!user) {
        return res.status(404).json({ message: "No such user" });
    }
    if (user.likedSongs) {
        console.log("Lkd songs", user.likedSongs);
        likedSongs = await getTracks(user.likedSongs);
        // console.log(likedSongs);
        for (let song of likedSongs) {
            song.likedflag = true;
        }
    }
    if (user.recentSongs) {
        songids = []
        for (const song of user.recentSongs) {
            songids.push(song.songId);
        }
        recentSongs = await getTracks(songids);
        for (song of recentSongs) {
            if (user.likedSongs.includes(song.songId)) {
                song.likedflag = true;
            }
            else {
                song.likedflag = false;
            }
        }
    }
    if (user.artistsFollowed) {
        // console.log("artistsfollowed", user.artistsFollowed);
        artistsFollowed = await getArtists(user.artistsFollowed);
    }

    recommendedSongs = await getRecommendedSongs(uname);
    for (let song of recommendedSongs) {
        if (user.likedSongs.includes(song.songId)) {
            song.likedflag = true;
        }
        else {
            song.likedflag = false;
        }
    }

    const playlistNames = user.playlists;
    for (const pname of playlistNames) {
        const check = await playlistCollection.findOne({ playlistName: pname });
        if (!check) {
            return res.status(404).json({ message: "no such playlist" });
        }
        else if (!check.songIds.length) {
            console.log("Empty playlist");
        }
        else {
            let playlist = await getTracks(check.songIds);
            let out = {
                playlistName: pname,
                images: playlist[0].images
            }
            playlists.push(out);
        }
    }

    let topSongArray = user.songsPlayed.sort((a, b) => { return a.playCount - b.playCount});
    if(topSongArray.length <= 5){
        topSongs = topSongArray;
    }
    else{
        topSongs = topSongArray.slice(0,5);
    }

    topSongs = await getTracks(topSongs.map(a => a.songId));
    return res.status(200).json({
        likedSongs: likedSongs,
        recentSongs: recentSongs,
        artistsFollowed: artistsFollowed,
        recommendedSongs: recommendedSongs,
        playlists: playlists,
        topSongs: topSongs
    })
}
