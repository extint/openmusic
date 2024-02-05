const express = require('express');

const router = express.Router();

const playlistController = require('../controllers/playlistController');

router.route('/add').post(playlistController.addToPlaylist);

router.route('/create').post(playlistController.createPlaylist);

router.route('/get').get(playlistController.getPlaylists);

router.route('/').get(playlistController.getPlaylist);

module.exports = router;