const { getTracks } = require('../utils/spotifyapi');
const userCollection = require('../models/userModel');
module.exports.getcontent = async (req, res)=>{
    const uname = req.body.userName;
    let likedSongs = [];
    let recentSongs = [];
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
        console.log("rcsongs", user.recentSongs);
        recentSongs = await getTracks(user.recentSongs);
    }

    return res.status(200).json({
        likedSongs: likedSongs,
        recentSongs: recentSongs
    })
}
