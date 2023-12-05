const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000' }));


const userRoutes = require('./routes/Users');
const blogPostRoutes = require('./routes/blogPost');
const userInteractionRoutes = require('./routes/userInteraction');
const searchRoutes = require('./routes/search');
const adminRoutes = require('./routes/admin');

mongoose.connect("mongodb://127.0.0.1:27017/myBlogDB")
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/blogposts', blogPostRoutes);
app.use('/api/interactions', userInteractionRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));