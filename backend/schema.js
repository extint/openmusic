const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/LoginFormPractice")
    .then(()=>{
        console.log('mongoose connected');
    })
    .catch((e)=>{
        console.log('failed');
    })





const UserSchema=new mongoose.Schema({
    UserName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    EmailId:{
        type:String,
        required:true
    },

    ProfilePhotoFilePath: String,//not sure

    //the foll aspects wont be user entered during signup...
    FriendCount: Number,
    RecentSongs: Array,
    Friends : Array,
    Artistsfollowed: Array ,//of Artist Ids(from spotify)
    Playlist: Array , //of Playlist ids


})


const UserCollection=new mongoose.model('UserCollection',UserSchema)

module.exports=UserCollection