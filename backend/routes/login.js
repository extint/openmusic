const express = require('express');
const router = express.Router();

const userController = require('../controllers/authController');

// TODO
router.route('/').post(userController.login);

module.exports = router;