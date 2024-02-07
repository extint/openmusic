// Define a base route for each route
const router = require('express').Router();
const loginRoutes = require('./login');
const signupRoutes = require('./signup');
const userRoutes = require('./user');
const homeRoutes = require('./home');
const playlistRoutes = require('./playlist');
const searchRoutes = require('./search');

/* Posts route */
router.use('/login', loginRoutes);
/* Comments route */
router.use('/signup', signupRoutes);
/* User route*/
router.use('/user', userRoutes);

router.use('/home', homeRoutes);

router.use('/playlist', playlistRoutes);

router.use('/search', searchRoutes);

module.exports = router;