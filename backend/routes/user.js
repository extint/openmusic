const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const authController = require('../controllers/authController');

router.route('/friend/add').post(userController.addFriend);

// router.route('/friend/get').get(userController.getFriendsList); // To do

router.route('/friend/delete').delete(userController.removeFriend); 

// router.route('/').get(userController.getUserDetails); // To do

router.route('/verify').post(authController.verifytoken);

router.route('/liked/add').post(userController.addLikedSong);

router.route('/liked/get').get(userController.getLikedSongs);

router.route('/liked/delete').delete(userController.unlikeSong);

router.route('/followed/add').post(userController.followArtist);

router.route('/followed/remove').delete(userController.unfollowArtist);

router.route('/recent/add').post(userController.addRecentSong);

router.route('/recent/clear').delete(userController.clearRecentSongs);

module.exports = router;