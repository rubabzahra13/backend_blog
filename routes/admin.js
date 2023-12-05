const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.get('/users', auth, adminController.getAllUsers);
router.put('/users/block/:userId', auth, adminController.blockUser);
router.get('/blogposts', auth, adminController.getAllBlogPosts);
router.delete('/blogposts/:postId', auth, adminController.deleteBlogPost);

module.exports = router;
