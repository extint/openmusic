const playlistCollection = require('../models/playlistModel');
const userCollection = require('../models/userModel');
const { getTracks } = require('../utils/spotifyapi');
const { shuffleArray } = require('../utils/utils');

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
        userCollection.updateOne({ userName: userName }, { $push: { playlists: newPlaylist.playlistName } })

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

module.exports.createBlend = async (req, res) => {
try {
   
    // artist similarity and song similarity in a combined
    const userName = req.body.userName;
    const playlistName = req.body.playlistName; // new playlist name
    const playlistName1 = req.body.playlistName1;
    const playlistName2 = req.body.playlistName2;
    const userName2 = req.body.userName2;

    // Check if the user exists
    const user = await userCollection.findOne({ userName: userName2 });
    if (!user) {
        return res.status(404).json({ message: "User does not exist" });
    }

    // Check if the playlist already exists
    const playlist = await playlistCollection.findOne({ userName: userName, playlistName: playlistName });
    const playlist1 = await playlistCollection.findOne({ userName: userName, playlistName: playlistName1 });
    const playlist2 = await playlistCollection.findOne({ userName: userName2, playlistName: playlistName2 });
    let newBPlaylist;
    if (playlist) {
        return res.status(400).json({ message: "Playlist already exists" });
    } else {
        if (!playlist1) {
            return res.status(400).json({ message: "You don't have any such playlist" });
        } else {
            if (!playlist2) {
                return res.status(400).json({ message: "Playlist does not exist" });
            } else {
                let songarray = new Set([...playlist1.songIds, ...playlist2.songIds]);
                shuffleArray(songarray);
                newBPlaylist = await playlistCollection.create({
                        userName: userName,
                        userId: user._id,
                        playlistName: playlistName,
                        songIds: songarray
                    });

                    // Update the user document with the new playlist _id
                    await userCollection.updateOne({ userName }, { $push: { playlists: newBPlaylist.playlistName } });

                    const commonSongIds = playlist1.songIds.filter(songId => playlist2.songIds.includes(songId)).length;
                
                    const totalUniqueSongIds = new Set([...playlist1.songIds, ...playlist2.songIds]).size;
                
                    const similarityPercentage = (commonSongIds / totalUniqueSongIds) * 100;
                
                    console.log(`${similarityPercentage}`);
                    

                    return res.status(200).json({ message: `Successfully added playlist. similarity : ${similarityPercentage}`,
                    playlist: newBPlaylist
                });

                    
            }
        }
    }
} catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};




// module.exports.similarity = async (req, res) => {
//     try {
//         const userName = req.body.userName;
//         const playlistName = req.body.playlistname; // Should be "playlistName" instead of "playlistname"
//         const playlistName1 = req.body.playlistName1;
//         const playlistName2 = req.body.playlistName2;
//         const userName2 = req.body.userName2;

//         // Check if the user exists
//         const user = await userCollection.findOne({ userName: userName2 });
//         if (!user) {
//             return res.status(404).json({ message: "User does not exist" });
//         }

//         // Check if the playlist already exists
//         const playlist = await playlistCollection.findOne({ userName: userName, playlistName: playlistName });
//         const playlist1 = await playlistCollection.findOne({ userName: userName, playlistName: playlistName1 });
//         const playlist2 = await playlistCollection.findOne({ userName: userName2, playlistName: playlistName2 });

//         if (playlist) {
//             return res.status(400).json({ message: "Playlist already exists" });
//         } else {
//             if (!playlist1) {
//                 return res.status(400).json({ message: "You don't have any such playlist" });
//             } else {
//                 if (!playlist2) {
//                     return res.status(400).json({ message: "Playlist does not exist" });
//                 } else {

                   
//                 }
//             }
//         }
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// };

//  try {

//         const commonSongIds = playlist1.songIds.filter(songId => playlist2.songIds.includes(songId)).length;

//         const totalUniqueSongIds = new Set([...playlist1.songIds, ...playlist2.songIds]).size;

//         const similarityPercentage = (commonSongIds / totalUniqueSongIds) * 100;

//         return similarityPercentage.toFixed(2);
//     } catch (error) {
//         console.error("Error calculating playlist similarity:", error);
//         throw error;
//     }




// // const calculatePlaylistSimilarity = async (playlist1, playlist2) => {
// //     try {

// //         const commonSongIds = playlist1.songIds.filter(songId => playlist2.songIds.includes(songId)).length;

// //         const totalUniqueSongIds = new Set([...playlist1.songIds, ...playlist2.songIds]).size;

// //         const similarityPercentage = (commonSongIds / totalUniqueSongIds) * 100;

// //         return similarityPercentage.toFixed(2);
// //     } catch (error) {
// //         console.error("Error calculating playlist similarity:", error);
// //         throw error;
// //     }
// // };


// // // Define an async function to wrap the code
// // const calculateAndLogSimilarity = async (playlist1, playlist2) => {
// //     try {
// //         const similarityPercentage = await calculatePlaylistSimilarity(playlist1, playlist2);
// //         console.log(`Percentage similarity between the playlists: ${similarityPercentage}%`);
// //     } catch (error) {
// //         console.error("Error calculating playlist similarity:", error);
// //     }
// // };

// // // Call the async function
// // calculateAndLogSimilarity(playlist1, playlist2);



