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

module.exports.getUserDetails = async (req, res) => {
    const userName = req.body.userName;

    const check = await userCollection.findOne({userName : userName});

    if(!check){
        return res.status(404).json({message: "User does not exist"});
    }
    else{
        const user = {
            userName: check.userName,
            emailId: check.emailId,
            profilePhotoFilePath: check.profilePhotoFilePath,
            //to complete
        }

        return res.status(200).json({user: user});
    }
}

module.exports.addFriend = async (req,res) => {
    const user = req.body.userName;
    const friend = req.body.friendName;

    const check1 = await userCollection.findOne({userName: user});
    const check2 = await userCollection.findOne({userName: friend});

    if(!check1 || !check2){
        return res.status(404).json({message: "User does not exist"});
    }
    else{
        userCollection.updateOne({userName: user}, {$push: {friends: friend}})
        .then(()=> { return res.status(200).json({message: "Successfully added friend"})})
        .catch((err)=>{ 
            console.log(err); 
            return res.status(500).json({message: "Internal Server Error"})
        });
    }
}

module.exports.removeFriend = async (req, res) => {
    const user = req.body.userName;
    const friend = req.body.friendName;

    const check1 = await userCollection.findOne({userName: user});
    const check2 = await userCollection.findOne({userName: friend});

    if(!check1 || !check2){
        return res.status(404).json({message: "User does not exist"});
    }
    else{
        if(check1.friends.includes(friend)){
            userCollection.updateOne({userName: user}, {$pullAll: {friends: [friend]}})
            .then(()=> { return res.status(200).json({message: "Successfully removed friend"})})
            .catch((err)=>{ 
                console.log(err); 
                return res.status(500).json({message: "Internal Server Error"})
            });

        }
        else{
            return res.status(404).json({message: "Given users are not friends"});
        }
    }
}

