const BlogPost = require('../models/Blogpost');

const searchBlogPosts = async (req, res) => {
  try {
    const { query, author, category, date } = req.query;

    let searchQuery = {};

    if (query) {
      searchQuery.$text = { $search: query }; 
    }
    if (author) {
      searchQuery.author = author;
    }
    if (category) {
      searchQuery.category = category;
    }
    if (date) {
      searchQuery.createdAt = { $gte: new Date(date) };
    }

    const blogPosts = await BlogPost.find(searchQuery).populate('author', 'username');

    res.json(blogPosts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  searchBlogPosts
};
