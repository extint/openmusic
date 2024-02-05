const playlistCollection = require('../models/playlistModel');
const userCollection = require('../models/userModel');
const { getTracks } = require('../utils/spotifyapi');

module.exports.createPlaylist = async (req, res) => {
    const playlistName = req.body.playlistName;
    const userName = req.body.userName;

    
        // Check if the user exists
        const user = await userCollection.findOne({ userName: userName });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        // Check if the playlist already exists
        const playlist = await playlistCollection.findOne({ userName: userName, playlistName: playlistName });
        if (playlist) {
            return res.status(400).json({ message: "Playlist already exists" });
        }
        else{

        // Create a new playlist document
        const newPlaylist = await playlistCollection.create({
            userName: userName,
            userId: user._id, 
            playlistName: playlistName,
            songIds: []
        });

        // Update the user document with the new playlist _id
        userCollection.updateOne({ userName: userName }, { $push: { playlists: newPlaylist._id } })

        .then(()=> { return res.status(200).json({ message: "Successfully added playlist." })})
        .catch((err) => { console.log(err) });
    
} 
};


module.exports.addToPlaylist = async (req, res) => {
    const playlistName = req.body.playlistName;
    const songId = req.body.songId;


    const check2 = await playlistCollection.findOne({playlistName:playlistName}) ;//check if playlist exists need to accces playlist id from Pname

    if(!check2){
        return res.status(404).json({message: "playlist does not exist"});
    }

    if (check2.songIds.includes(songId)) {
        return res.status(400).json({ message: "Song is already in the playlist" });
    }
    else {
        playlistCollection.updateOne({ playlistName: playlistName }, { $push: { songIds: songId } })
            .then(() => { return res.status(200).json({ message: "Successfully added song." }) })
            .catch((err) => { console.log(err) });
    }
}

module.exports.getPlaylists = async (req, res) => {
    const uname = req.body.userName;
    const check = await userCollection.find({userName: uname});
    if(!check){
        return res.status(404).json({message: "User does not have any playlists"})
    }
    else{
        const playlists = check.playlists;
        if(!playlists.length){
            return res.status(400).json({message: "Empty playlist"});
        }
        else {
            return res.status(200).json(playlists);
        }
    }
    
}

module.exports.getPlaylist = async (req, res) => {
    const pname = req.body.playlistName;
    const check = await playlistCollection.findOne({playlistName : pname});
    if(!check){
        return res.status(404).json({message: "no such playlist"});
    }
    else if(!check.songIds.length){
        return res.status(400).json({message:"empty playlist"});
    }
    else{
        return res.status(200).json(await getTracks(check.songIds));
    }
}