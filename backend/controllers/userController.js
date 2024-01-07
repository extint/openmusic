const userCollection = require('../models/userModel');

module.exports.addLikedSong = async (req, res) => {
    const user = {
        userName: req.body.userName
    }
    const songId = req.body.songId;
    const check = await userCollection.findOne({ userName: user.userName });

    if (!check) {
        return res.status(404).json({ message: "User does not exist." });
    }

    else {
        if (check.LikedSongs && check.LikedSongs.findOne((id) => { return id == songId })) {
            return res.status(400).json({ message: "Song is already liked" });
        }
        else {
            userCollection.updateOne({ userName: user.userName }, { $push: { likedSongs: songId } })
                .then(() => { return res.status(200).json({ message: "Successfully added liked song." }) })
                .catch((err) => { console.log(err) });
        }
    }
}

module.exports.getLikedSongs = async (req, res) => {
    const user = {
        userName: req.body.userName
    }
    const check = await userCollection.findOne({ userName: user.userName });

    if (!check) {
        return res.status(404).json({ message: "User does not exist" });
    }

    else {
        return res.status(200).json({ message: "Liked Songs returned", likedSongs: check.likedSongs });
    }
}

module.exports.unlikeSong = async (req, res) => {
    const user = {
        userName: req.body.userName
    }
    const songId = req.body.songId;
    const check = await userCollection.findOne({ userName: user.userName });

    if (!check) {
        return res.status(404).json({ message: "User does not exist" });
    }
    else {
        if (check.likedSongs.includes(songId)) {
            userCollection.updateOne({ userName: user.userName }, { $pullAll: { likedSongs: [songId] } })
                .then(() => { return res.status(200).json({ message: "Song unliked successfully" }) })
                .catch((err) => { console.log(err) });
        }
        else {
            return res.status(404).json({ message: "Song is not liked" });
        }
    }
}