// Define a base route for each route
const router = require('express').Router();
const loginRoutes = require('./login');
const signupRoutes = require('./signup');

/* Posts route */
router.use('/login', loginRoutes);
/* Comments route */
router.use('/signup', signupRoutes);

module.exports = router;