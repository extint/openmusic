const express = require('express');

const router = express.Router();

const artistController = require('../controllers/artistController');

router.route('/').get(artistController.getContent);

module.exports = router;