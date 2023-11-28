const UserCollection = require('../models/userModel')

// mongoose.connect("mongodb://localhost:27017/openMusicDB")
//     .then(()=>{
//         console.log('mongoose connected');
//     })
//     .catch((e)=>{
//         console.log('failed');
//     })

module.exports.signup = async (req, res) => {
    const data = {
        UserName: req.body.UserName,
        password: req.body.password,
        EmailId: req.body.EmailId,
        ProfilePhotoFilePath: req.body.filepath//not sure kya aayega
    };

    const checking = await UserCollection.findOne({ UserName: data.UserName });

    try {
        // Only check if that username already exists
        if (checking.UserName === data.UserName) {
            return res.status(409).json({ message: "Error, user with that email already exists." });
        }
        else {
            await UserCollection.insertOne(data);
        }
    }
    catch {
        return res.status(500).json({ message: "Internal Server Error" });
    }

    return res.status(201).json({ message: "Successfully Created New User" });
};


module.exports.login = async (req, res) => {
    // TODO
};

// const UserSchema=new mongoose.Schema({
//     UserName:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     EmailId:{
//         type:String,
//         required:true
//     },

//     ProfilePhotoFilePath: String,//not sure

//     //the foll aspects wont be user entered during signup...
//     FriendCount: Number,
//     RecentSongs: Array,
//     Friends : Array,
//     Artistsfollowed: Array ,//of Artist Ids(from spotify)
//     Playlist: Array , //of Playlist ids


// })


// const UserCollection=new mongoose.model('UserCollection',UserSchema)

// module.exports=UserCollection