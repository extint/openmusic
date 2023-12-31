// Define a base route for each route
const router = require('express').Router();
const loginRoutes = require('./login');
const signupRoutes = require('./signup');
const userRoutes = require('./user');

/* Posts route */
router.use('/login', loginRoutes);
/* Comments route */
router.use('/signup', signupRoutes);
router.use('/user', userRoutes);

module.exports = router;