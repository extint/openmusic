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
    console.log("user", user);
    const check = await userCollection.findOne({ userName: user.userName });
    console.log(check);
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

module.exports.getUserDetails = async (req, res) => {
    const userName = req.body.userName;

    const check = await userCollection.findOne({ userName: userName });

    if (!check) {
        return res.status(404).json({ message: "User does not exist" });
    }
    else {
        const user = {
            userName: check.userName,
            emailId: check.emailId,
            profilePhotoFilePath: check.profilePhotoFilePath,
            //to complete
        }

        return res.status(200).json({ user: user });
    }
}

module.exports.addFriend = async (req, res) => {
    const user = req.body.userName;
    const friend = req.body.friendName;

    const check1 = await userCollection.findOne({ userName: user });
    const check2 = await userCollection.findOne({ userName: friend });

    if (!check1 || !check2) {
        return res.status(404).json({ message: "User does not exist" });
    }
    else {
        userCollection.updateOne({ userName: user }, { $push: { friends: friend } })
            .then(() => { return res.status(200).json({ message: "Successfully added friend" }) })
            .catch((err) => {
                console.log(err);
                return res.status(500).json({ message: "Internal Server Error" })
            });
    }
}

module.exports.removeFriend = async (req, res) => {
    const user = req.body.userName;
    const friend = req.body.friendName;

    const check1 = await userCollection.findOne({ userName: user });
    const check2 = await userCollection.findOne({ userName: friend });

    if (!check1 || !check2) {
        return res.status(404).json({ message: "User does not exist" });
    }
    else {
        if (check1.friends.includes(friend)) {
            userCollection.updateOne({ userName: user }, { $pullAll: { friends: [friend] } })
                .then(() => { return res.status(200).json({ message: "Successfully removed friend" }) })
                .catch((err) => {
                    console.log(err);
                    return res.status(500).json({ message: "Internal Server Error" })
                });

        }
        else {
            return res.status(404).json({ message: "Given users are not friends" });
        }
    }
}

module.exports.followArtist = async (req, res) => {
    const user = req.body.userName;
    const artistId = req.body.artistId;
    const check1 = await userCollection.findOne({ userName: user });
    if (!check1) {
        return res.status(404).json({ message: "No such user" });
    }
    else {
        if (check1.artistsFollowed.includes(artistId)) {
            return res.status(400).json({ message: "Already following artist" });
        }
        else {
            await userCollection.updateOne({ userName: user }, { $push: { artistsFollowed: artistId } });
            return res.status(200).json({ message: "Successfully followed artist" });
        }
    }
}

module.exports.unfollowArtist = async (req, res) => {
    const user = req.body.userName;
    const artistId = req.body.artistId;
    const check1 = await userCollection.findOne({ userName: user });
    if (!check1) {
        return res.status(404).json({ message: "No such user" });
    }
    else {
        if (check1.artistsFollowed.includes(artistId)) {
            await userCollection.updateOne({ userName: user }, { $pullAll: { artistsFollowed: [artistId] } });
            return res.status(200).json({ message: "Successfully unfollowed artist" });
        }
        else {
            return res.status(400).json({ message: "Not following artist" })
        }
    }
}

module.exports.addRecentSong = async (req, res) => {
    const user = req.body.userName;
    const songId = req.body.songId;

    const check1 = await userCollection.findOne({ userName: user });
    if (!check1) {
        return res.status(404).json({ message: "User not found" });
    }
    for (const song of check1.recentSongs) {
        if (song.songId == songId) {
            return res.status(400).json({ message: "Song is already recent" });
        }
    }
    let popper = {
        songId: "",
        timeAdded: Infinity
    }
    let pusher = {
        songId: songId,
        timeAdded: Math.floor(Date.now() / 1000)
    }
    if (check1.recentSongs.length == 5) {
        for (const song of check1.recentSongs) {
            if (song.timeAdded < popper.timeAdded) {
                popper = song;
            }
        }
        const res1 = await userCollection.updateOne({ userName: user }, { $pullAll: { recentSongs: [popper] } });
        console.log("first delete", res1);
        pusher.timeAdded = Math.floor(Date.now() / 1000);
        const res2 = await userCollection.updateOne({ userName: user }, { $push: { recentSongs: pusher } });
        console.log("pushed", res2);
        return res.status(200).json({ message: "Succesfully added recent song" });
    }
    else {
        const newrecent = {
            songId: songId,
            timeAdded: Math.floor(Date.now() / 1000)
        }
        await userCollection.updateOne({ userName: user }, { $push: { recentSongs: newrecent } });
        return res.status(200).json({ message: "Successfully added recent song" });
    }

}

module.exports.clearRecentSongs = async (req, res) => {
    const user = req.body.userName;
    const check1 = await userCollection.findOne({ userName: user });
    if (!check1) {
        return res.status(404).json({ message: "No such user" });
    }
    else {
        await userCollection.updateOne({ userName: user }, { $set: { recentSongs: [] } });
        return res.status(200).json({ message: "Successfully cleared recent songs" });
    }
}

module.exports.unfollowArtist = async (req, res) => {
    const user = req.body.userName;
    const artistId = req.body.artistId;
    const check1 = await userCollection.findOne({ userName: user });
    if (!check1) {
        return res.status(404).json({ message: "No such user" });
    }
    else {
        if (check1.artistsFollowed.includes(artistId)) {
            await userCollection.updateOne({ userName: user }, { $pullAll: { artistsFollowed: [artistId] } });
            return res.status(200).json({ message: "Successfully unfollowed artist" });
        }
        else {
            return res.status(400).json({ message: "Not following artist" })
        }
    }
}

module.exports.addRecentArtist = async (req, res) => {
    const user = req.body.userName;
    const artistId = req.body.artistId;

    const check1 = await userCollection.findOne({ userName: user });
    if (!check1) {
        return res.status(404).json({ message: "User not found" });
    }
    for (const artist of check1.recentArtists) {
        if (artist.artistId == artistId) {
            return res.status(200).json({ message: "Artist is already recent" });
        }
    }
    let popper = {
        artistId: "",
        timeAdded: Infinity
    }
    let pusher = {
        artistId: artistId,
        timeAdded: Math.floor(Date.now() / 1000)
    }
    if (check1.recentArtists.length == 5) {
        for (const artist of check1.recentArtists) {
            if (artist.timeAdded < popper.timeAdded) {
                popper = artist;
            }
        }
        const res1 = await userCollection.updateOne({ userName: user }, { $pullAll: { recentArtists: [popper] } });
        console.log("first delete", res1);
        pusher.timeAdded = Math.floor(Date.now() / 1000);
        const res2 = await userCollection.updateOne({ userName: user }, { $push: { recentArtists: pusher } });
        console.log("pushed", res2);
        return res.status(200).json({ message: "Succesfully added recent artist" });
    }
    else {
        const newrecent = {
            artistId: artistId,
            timeAdded: Math.floor(Date.now() / 1000)
        }
        await userCollection.updateOne({ userName: user }, { $push: { recentArtists: newrecent } });
        return res.status(200).json({ message: "Successfully added recent artist" });
    }

}

module.exports.play = async (req, res) => {
    const uname = req.query.userName;
    const songId = req.query.songId;

    const user = await userCollection.findOne({ userName: uname });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    let skip = false;
    let check = false;
    if (user.songsPlayed.length > 0) {
        for (const song of user.songsPlayed){
            if(song.songId == songId){
                check = true;
            }
        }
    }

    if (!check) {
        await userCollection.updateOne({ userName: uname }, {
            $push: {
                songsPlayed: {
                    songId: songId,
                    lastPlayed: Math.floor(Date.now() / 1000),
                    playCount: 1
                }
            }
        })
        console.log("Created");
    }
    else {
        await userCollection.updateOne({ userName: uname }, {
            $inc: {
                "songsPlayed.$[outer].playCount": 1
            }
        },
            { arrayFilters: [{ "outer.songId": songId }] });
        console.log("incremented playcount");
    }



    for (const song of user.recentSongs) {
        if (song.songId == songId) {
            return res.status(200).json({ message: "Song is already recent" });
        }
    }
    let popper = {
        songId: "",
        timeAdded: Infinity
    }
    let pusher = {
        songId: songId,
        timeAdded: Math.floor(Date.now() / 1000)
    }
    if (user.recentSongs.length == 5) {
        for (const song of user.recentSongs) {
            if (song.timeAdded < popper.timeAdded) {
                popper = song;
            }
        }
        const res1 = await userCollection.updateOne({ userName: uname }, { $pullAll: { recentSongs: [popper] } });
        pusher.timeAdded = Math.floor(Date.now() / 1000);
        const res2 = await userCollection.updateOne({ userName: uname }, { $push: { recentSongs: pusher } });
    }
    else {
        const newrecent = {
            songId: songId,
            timeAdded: Math.floor(Date.now() / 1000)
        }
        await userCollection.updateOne({ userName: uname }, { $push: { recentSongs: newrecent } });
    }
    return res.status(200).json({ message: "successfull played song" });

}