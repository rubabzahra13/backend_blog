const express = require('express');
const router = express.Router();

const blogPostController = require('../controllers/blogPostController');
const auth = require('../middleware/auth');

router.post('/', auth, blogPostController.createBlogPost);
router.get('/', blogPostController.getAllBlogPosts);
router.get('/:id', blogPostController.getBlogPostById);
router.put('/:id', auth, blogPostController.updateBlogPost);
router.delete('/:id', auth, blogPostController.deleteBlogPost);

module.exports = router;
