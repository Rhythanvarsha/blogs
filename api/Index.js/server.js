const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? ['https://rhythanvarsha.github.io']
    : ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
const MONGODB_URI = process.env.NODE_ENV === 'production'
  ? process.env.MONGODB_URI // This will be set in Render
  : 'mongodb://127.0.0.1:27017/Main_Blog';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  content: String,
  category: String,
  publishDate: Date,
});

const User = mongoose.model('User', UserSchema);
const Blog = mongoose.model('Blog', BlogSchema);

app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.username === username ? 'Username already exists' : 'Email already exists'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Error during registration' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

app.post('/blogs', async (req, res) => {
  const newBlog = new Blog(req.body);
  await newBlog.save();
  res.status(201).json({ message: 'Blog published' });
});

app.get('/blogs', async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json(blogs);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* Now your app supports full CRUD operations with MongoDB & JWT authentication! */