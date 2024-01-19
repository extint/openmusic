const playlistCollection = require('../models/playlistModel');
const userCollection = require('../models/userModel');


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
            songIds: {} 
        });

        // Update the user document with the new playlist _id
        userCollection.updateOne({ userName: userName }, { $push: { playlists: newPlaylist._id } })

        .then(()=> { return res.status(200).json({ message: "Successfully added playlist." })})
        .catch((err) => { console.log(err) });
    
} 
};


module.exports.addToPlaylist = async (req, res) => {
    const playlistName = req.body.playlistName;
    const userName = req.body.userName;
    const songId = req.body.songId;


    const check1 = await userCollectionserCollection.findOne({userName : userName});
    const check2 = await playlistCollection.findOne({userName:userName,playlistName:playlistName}) ;//check if playlist exists need to accces playlist id from Pname
    if(!check1){
        return res.status(404).json({message: "User does not exist"});
    }
    if(!check2){
        return res.status(404).json({message: "playlist does not exist"});
    }

    if (check1.playlistName && check2.songIds.findOne((songId) => { return id == songId })) {
        return res.status(400).json({ message: "Song is already in the playlist" });
    }
    else {
        playlistCollection.updateOne({ userName: playlistName.userName }, { $push: { songIds: songId } })
            .then(() => { return res.status(200).json({ message: "Successfully added  song." }) })
            .catch((err) => { console.log(err) });
    }
}

module.exports.getPlaylists = async (req, res) => {

    
}