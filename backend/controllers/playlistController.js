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
    else {

        // Create a new playlist document
        const newPlaylist = await playlistCollection.create({
            userName: userName,
            userId: user._id,
            playlistName: playlistName,
            songIds: {}
        });

        // Update the user document with the new playlist _id
        userCollection.updateOne({ userName: userName }, { $push: { playlists: newPlaylist._id } })

            .then(() => { return res.status(200).json({ message: "Successfully added playlist." }) })
            .catch((err) => { console.log(err) });

    }
};


module.exports.addToPlaylist = async (req, res) => {
    const playlistName = req.body.playlistName;
    const userName = req.body.userName;
    const songId = req.body.songId;


    const check1 = await userCollectionserCollection.findOne({ userName: userName });
    const check2 = await playlistCollection.findOne({ userName: userName, playlistName: playlistName });//check if playlist exists need to accces playlist id from Pname
    if (!check1) {
        return res.status(404).json({ message: "User does not exist" });
    }
    if (!check2) {
        return res.status(404).json({ message: "playlist does not exist" });
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

//can be added to user controller not sure

module.exports.createBlend = async (req, res) => {
    const userName = req.body.userName;
    const playlistName = req.body.playlistname;//newplaylistname
    const playlistName1 = req.body.playlistName1;//name of users playlist 

    const playlistName2 = req.body.playlistName2;//usernmae of other users playlist
    const userName2 = req.body.userName2;//name of other users playlist to be blended

    // Check if the user exists
    const user = await userCollection.findOne({ userName: userName2 });
    if (!user) {
        return res.status(404).json({ message: "User does not exist" });
    }

    // Check if the playlist already exists
    const playlist = await playlistCollection.findOne({ userName: userName, playlistName: playlistName });
    const playlist1 = await playlistCollection.findOne({ userName: userName, playlistName: playlistName1 });
    const playlist2 = await playlistCollection.findOne({ userName: userName2, playlistName: playlistName2 });

    if (playlist) {
        return res.status(400).json({ message: "Playlist already exists" });
    }
    else {

        if (!playlist1) {
            return res.status(400).json({ message: "You dont have any such playlist" });
        }
        else {
            if (!playlist2) {
                return res.status(400).json({ message: " playlist does not exist " });
            }
            else {

                // Create blend
                const newBPlaylist = await playlistCollection.create({
                    userName: userName,
                    userId: user._id,
                    playlistName: playlistName,
                    songIds: playlist1.songIds.concat(playlist2.songIds) ,

                });
            }
        }
    }

    // Update the user document with the new playlist _id
    userCollection.updateOne({ userName: userName }, { $push: { playlists: newBPlaylist._id } })

        .then(() => { return res.status(200).json({ message: "Successfully added playlist." }) })
        .catch((err) => { console.log(err) });

}
    ;