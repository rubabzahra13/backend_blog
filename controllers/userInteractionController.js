const User = require('../models/User');
const BlogPost = require('../models/Blogpost');

const followUser = async (req, res) => {
  
    try {
        const userIdToFollow = req.params.id;
        const user = await User.findById(userIdToFollow);
        if (!user) {
        return res.status(404).json({ msg: 'User not found' });
        }
        const currentUser = await User.findById(req.user.id);
        if (currentUser.following.includes(userIdToFollow)) {
        return res.status(400).json({ msg: 'User already followed' });
        }
        currentUser.following.push(userIdToFollow);
        user.followers.push(req.user.id);
        await currentUser.save();
        await user.save();
        res.json({ msg: 'User followed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

const unfollowUser = async (req, res) => {
  
    try {
        const userIdToUnfollow = req.params.id;
        const user = await User.findById(userIdToUnfollow);
        if (!user) {
        return res.status(404).json({ msg: 'User not found' });
        }
        const currentUser = await User.findById(req.user.id);
        if (!currentUser.following.includes(userIdToUnfollow)) {
        return res.status(400).json({ msg: 'User not followed' });
        }
        const followingIndex = currentUser.following.indexOf(userIdToUnfollow);
        const followersIndex = user.followers.indexOf(req.user.id);
        currentUser.following.splice(followingIndex, 1);
        user.followers.splice(followersIndex, 1);
        await currentUser.save();
        await user.save();
        res.json({ msg: 'User unfollowed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

const getFeed = async (req, res) => {
  
    try {
        const currentUser = await User.findById(req.user.id);
        const userFollowing = currentUser.following;
        const feed = await BlogPost.find({ author: { $in: userFollowing } }).populate('author', '-password');
        res.json(feed);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

module.exports = {
  followUser,
  unfollowUser,
  getFeed
};
