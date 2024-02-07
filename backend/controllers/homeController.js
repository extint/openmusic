const { getTracks, getArtists, getRecommendedSongs } = require('../utils/spotifyapi');
const userCollection = require('../models/userModel');

module.exports.getcontent = async (req, res)=>{
    const uname = req.query.userName;
    console.log("uname", uname)
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
        // console.log(likedSongs);
    }
    if(user.recentSongs){
        songids = []
        for(const song of user.recentSongs){
            songids.push(song.songId);
        }
        recentSongs = await getTracks(songids);
        for(song of recentSongs){
            if(user.likedSongs.includes(song.songId)){
                song.likedflag = true;
            }
            else{
                song.likedflag = false;
            }
        }
    }
    if(user.artistsFollowed){
        // console.log("artistsfollowed", user.artistsFollowed);
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
