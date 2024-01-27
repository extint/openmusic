// Define a base route for each route
const router = require('express').Router();
const loginRoutes = require('./login');
const signupRoutes = require('./signup');
const userRoutes = require('./user');
const homeRoutes = require('./home');

/* Posts route */
router.use('/login', loginRoutes);
/* Comments route */
router.use('/signup', signupRoutes);
/* User route*/
router.use('/user', userRoutes);

router.use('/home', homeRoutes);

module.exports = router;