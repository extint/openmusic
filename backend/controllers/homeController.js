const { getTracks, getArtists, getRecommendedSongs } = require('../utils/spotifyapi');
const userCollection = require('../models/userModel');
module.exports.getcontent = async (req, res)=>{
    const uname = req.query.userName;
    let likedSongs = [];
    let recentSongs = [];
    let artistsFollowed = [];
    let recommendedSongs = [];
    const user = await userCollection.findOne({userName: uname});
    if(!user){
        return res.status(404).json({ message: "No such user"});
    }
    if(user.likedSongs){
        console.log("Lkd songs", user.likedSongs);
        likedSongs = await getTracks(user.likedSongs);
        console.log(likedSongs), "before return";
    }
    if(user.recentSongs){
        songids = []
        for(const song of user.recentSongs){
            songids.push(song.songId);
        }
        console.log("rcsongs", songids);
        recentSongs = await getTracks(songids);
    }
    if(user.artistsFollowed){
        console.log("artistsfollowed", user.artistsFollowed);
        artistsFollowed = await getArtists(user.artistsFollowed);
    }
    recommendedSongs = await getRecommendedSongs(uname);
    // console.log("HERRRRRRRRRRR", recommendedSongs);
    return res.status(200).json({
        likedSongs: likedSongs,
        recentSongs: recentSongs,
        artistsFollowed: artistsFollowed,
        recommendedSongs: recommendedSongs
    })
}
