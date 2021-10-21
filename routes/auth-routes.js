// Importing npm package
const router = require('express').Router();

// Importing modules
const authControllers = require('../controllers/auth-controllers');
const isLoggedIn = require('../middleware/auth-middleware');

router.post('/signup', async (req, res) => {
    authControllers.signup(req, res);
});

router.post('/login', async (req, res) => {
    authControllers.login(req, res);
});

router.get('/profile', isLoggedIn, async (req, res) => {
    authControllers.profile(req, res);
});

router.post('/logout', isLoggedIn, async (req, res) => {
    authControllers.logout(req, res);
});

router.post('/logout-all', isLoggedIn, async (req, res) => {
    authControllers.logoutAll(req, res);
});

// Exporting all the above defined task router
module.exports = router;