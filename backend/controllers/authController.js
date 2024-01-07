const userCollection = require('../models/userModel')

// mongoose.connect("mongodb://localhost:27017/openMusicDB")
//     .then(()=>{
//         console.log('mongoose connected');
//     })
//     .catch((e)=>{
//         console.log('failed');
//     })

module.exports.signup = async (req, res) => {
    const data = {
        userName: req.body.userName,
        password: req.body.password,
        emailId: req.body.emailId,
        profilePhotoFilePath: req.body.filepath//not sure kya aayega
    };

    const checking = await userCollection.findOne({ userName: data.userName });

    try {
        // Only check if that username already exists
        if (checking && checking.userName === data.userName) {
            return res.status(409).json({ message: "Error, user with that email already exists." });
        }
        else {
            await userCollection.create(data);
        }
    }
    catch(e) {
        console.log(e)
        return res.status(500).json({ message: "Internal Server Error..." });
    }

    return res.status(201).json({ message: "Successfully Created New User" });
};


module.exports.login = async (req, res) => {
    const data = {
        userName: req.body.userName,
        password: req.body.password,
    };

    const user = await userCollection.findOne({ userName: data.userName });

    if(!user){
        return res.status(404).json({message: "User does not exist"})
    }

    if(user.password == data.password){
        return res.status(200).json({message: "Successfull Login"})
    }
    else{
        return res.status(401).json({message: "Incorrect Password/Username"})
    }
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