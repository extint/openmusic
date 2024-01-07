const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.route('/friend').post(userController.addFriend);

// router.route('/friend').get(userController.getFriendsList); // To do

router.route('/friend').delete(userController.removeFriend); 

// router.route('/').get(userController.getUserDetails); // To do

router.route('/like').post(userController.addLikedSong);

router.route('/like').get(userController.getLikedSongs);

router.route('/like').delete(userController.unlikeSong);

module.exports = router;