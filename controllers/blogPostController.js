const BlogPost = require('../models/Blogpost');

const createBlogPost = async (req, res) => {
  
    try {
        const { title, content } = req.body;
    
        const blogPost = new BlogPost({
            title,
            content,
        });

        await blogPost.save();

        res.json(blogPost);
    } catch (err) {
        console.error(err.message);
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

const getBlogPostById = async (req, res) => {

    try {
        const blogPostId = req.params.id;
        const blogPost = await BlogPost.findById(blogPostId).populate('author', '-password');
        if (!blogPost) {
            return res.status(404).json({ msg: 'Blog post not found' });
        }
        res.json(blogPost);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

const updateBlogPost = async (req, res) => {
    
    try {
        const blogPostId = req.params.id;
        const { title, content } = req.body;
    
        let blogPost = await BlogPost.findById(blogPostId);
        if (!blogPost) {
          return res.status(404).json({ msg: 'Blog post not found' });
        }
    
        blogPost.title = title || blogPost.title;
        blogPost.content = content || blogPost.content;
    
        await blogPost.save();
    
        res.json({ msg: 'Blog post updated successfully' });
        } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

const deleteBlogPost = async (req, res) => {
  
    try {
        const blogPostId = req.params.id;
    
        let blogPost = await BlogPost.findById(blogPostId);
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
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost
};
