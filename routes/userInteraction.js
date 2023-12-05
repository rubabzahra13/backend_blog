const express = require('express');
const router = express.Router();
const userInteractionController = require('../controllers/userInteractionController');
const auth = require('../middleware/auth'); 

router.post('/follow/:userId', auth, userInteractionController.followUser);
router.post('/unfollow/:userId', auth, userInteractionController.unfollowUser);
router.get('/feed', auth, userInteractionController.getFeed);

module.exports = router;
