const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userController = require('../controllers/UserController');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/profile', auth, userController.getUserProfile);
router.put('/profile', auth, userController.updateUserProfile);

module.exports = router;
