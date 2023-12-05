const User = require('../models/User');
const BlogPost = require('../models/Blogpost');

const getAllUsers = async (req, res) => {
  
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

const blockUser = async (req, res) => {
  
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        user.isBlocked = !user.isBlocked;
        await user.save();

        res.json({ msg: `User has been ${user.isBlocked ? 'blocked' : 'unblocked'}` });
        } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }

};

const getAllBlogPosts = async (req, res) => {
  
    try {
        const blogPosts = await BlogPost.find().populate('author', '-password');
        res.json(blogPosts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

const deleteBlogPost = async (req, res) => {
 
    try {
        const blogPostId = req.params.id;
        const blogPost = await BlogPost.findById(blogPostId);
        if (!blogPost) {
        return res.status(404).json({ msg: 'Blog post not found' });
        }
        await blogPost.remove();
        res.json({ msg: 'Blog post deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

module.exports = {
  getAllUsers,
  blockUser,
  getAllBlogPosts,
  deleteBlogPost
};
