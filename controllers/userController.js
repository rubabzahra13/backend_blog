require('dotenv').config();

jwt_secret = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5OTcxODU0MiwiaWF0IjoxNjk5NzE4NTQyfQ.F5qGQiKqLMB8Ug-OzkEX10-XsD8lH0oYvlEOmSS9HMg";

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const getJWTToken = (payload) => {
    return jwt.sign(payload, jwt_secret, { expiresIn: '1h' });
};

const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({ username, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(201).json({ msg: 'User registered successfully' });
        } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }   
};

const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
        user: {
            id: user.id,
        },
    };

    const token = getJWTToken(payload);

    res.json({ msg: 'User logged in successfully',
        token,   
    });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


const getUserProfile = async (req, res) => {
  
    try {

        const userId = req.user.id;
    
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
    
        res.json(user);
        } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

};

const updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, email } = req.body;
    
        let user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ msg: 'User not found' });
        }
    
        user.username = username || user.username;
        user.email = email || user.email;
    
        await user.save();
    
        res.json({ msg: 'User profile updated successfully' });
        } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile
};