const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.route('/friend/add').post(userController.addFriend);

// router.route('/friend/get').get(userController.getFriendsList); // To do

router.route('/friend/delete').delete(userController.removeFriend); 

// router.route('/').get(userController.getUserDetails); // To do

router.route('/liked/add').post(userController.addLikedSong);

router.route('/liked/get').get(userController.getLikedSongs);

router.route('/liked/delete').delete(userController.unlikeSong);

module.exports = router;