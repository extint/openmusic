const express=require('express')
const userCollection = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser')
const app = express();

app.use(cookieParser())
// mongoose.connect("mongodb://localhost:27017/openMusicDB")
//     .then(()=>{
//         console.log('mongoose connected');
//     })
//     .catch((e)=>{
//         console.log('failed');
//     })


////////////

// need to add validation if all fields are entered 

module.exports.signup = async (req, res) => {
    const data = {
        userName: req.body.userName,
        password: req.body.password,
        emailId: req.body.emailId
    };

    const checking = await userCollection.findOne({ userName: data.userName });

    try {
        // Only check if that username already exists
        if (checking && checking.userName === data.userName) {
            return res.status(409).json({ message: "Error, user with that email already exists." });
        }
        else {
            //encrypt password
            const encpassword = await bcrypt.hash(password,10)

            //save in db
            const nuser=await userCollection.create({
                userName,
                password:encpassword,
                emailId,
                profilePhotoFilePath


            })

            //generate token for user and send it
            const token = jwt.sign(
                { id: nuser._id, emailId},
                'shhhh', //process.env.jwtsecret something like this can be used
                {
                    expiresIn:"2h"
                }
            );
            nuser.token = token
            nuser.password=undefined

                res.status(201).json(nuser)//can send anything or save in db

        }
    }
    catch(e) {
        console.log(e)
        return res.status(500).json({ message: "Internal Server Error..." });
    }
    

    return res.status(201).json({ message: "Successfully Created New User" });
};


module.exports.login = async (req, res) => {
     //get all data from frontend
     const data = {
        userName: req.body.userName,
        password: req.body.password,
    };

    //check user in db
    const user = await userCollection.findOne({ userName: data.userName });

    
    if(!user){
        return res.status(404).json({message: "User does not exist"})
    }

    //match password

    if (user && await bcrypt.compare(password, user.password)){
        const token =jwt.sign(
            {id:user._id},
            'shhhh', //process.env.jwtsecret something like this can be used
                {
                    expiresIn:"2h"
                }
            )

            user.token =token
            user.password=undefined

            //send token to user cookie
            const option ={
                expires:new Date(Date.now()+ 3*24*60*60*1000),
                httpOnly:true,
            };

            res.status(200).cookie("token",token,options).json({
                success:true,
                token,
                user
            })
    
            
        };

    // if(user.password == data.password){
    //     return res.status(200).json({message: "Successfull Login"})
    // }
    // else{
    //     return res.status(401).json({message: "Incorrect Password/Username"})
    // }
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