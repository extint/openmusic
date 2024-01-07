const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

router.route('/like').post(userController.addLikedSong);

router.route('/like').get(userController.getLikedSongs);

router.route('/like').delete(userController.unlikeSong);

module.exports = router;