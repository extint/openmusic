const userCollection = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createSecretToken } = require('../utils/token');
require('dotenv').config();

module.exports.signup = async (req, res, next) => {
    const data = {
        userName: req.body.userName,
        password: req.body.password,
        emailId: req.body.emailId
    };

    const checking = await userCollection.findOne({ userName: data.userName });

    try {
        // Only check if that username already exists
        if (checking && checking.userName === data.userName) {
            return res.status(409).json({ message: "Error, user with that name already exists." });
        }
        else {

            const user = await userCollection.create({
                userName: data.userName,
                password: data.password,
                emailId: data.emailId
            })

            //generate token for user and send it
            const token = createSecretToken(user._id);
            console.log(token);
            res.cookie("token", token, {
                withCredentials:true,
                httpOnly:false
            });

            res.status(201).json({message: "Successfull signup", success: true, user})
            next();
        }
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Internal Server Error..." });
    }
};


module.exports.login = async (req, res, next) => {
    //get all data from frontend
    try{
        const data = {
            userName: req.body.userName,
            password: req.body.password
        };

        //check user in db
        const user = await userCollection.findOne({ userName: data.userName });


        if (!user) {
            return res.status(404).json({ message: "User does not exist" })
        };

        //match password

        if (user && await bcrypt.compare(data.password, user.password)) {
            const token = createSecretToken(user._id);
            res.cookie("token", token, {
                withCredentials: true,
                httpOnly: false
            })
            res.status(201).json({ message: "Successfull login", success: true});
            next();
        }
        else{
            res.status(400).json({message: "Incorrect name/password", success: false});
        }
    }
    catch(e){
        console.log(e);
    }


};

module.exports.verifytoken = async (req, res) => {
    const token = req.cookies.token;
    console.log(token);
    console.log(process.env.JWT_SECRET);
    if(!token){
        return res.status(400).json({message: "no cookie provided", success: false});
    }
    jwt.verify(token, process.env.JWT_SECRET, async(err, data) => {
        if(err){
            console.log(err);
            return res.status(400).json({ success: false});
        }
        else{
            const user = await userCollection.findById(data.id);
            if(user) return res.status(200).json({message: "Succesful verification", success: true, user: user.userName});
            else return res.status(400).json({success: false});
        }
    })
}