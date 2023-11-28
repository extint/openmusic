const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// TODO
router.route('/').post(userController.login);

module.exports = router;