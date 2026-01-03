const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Admin = require('../models/Admin');

// User Login
router.post('/user/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    // Find user by name and password
    const user = await User.findOne({ name, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// User Registration
router.post('/user/register', async (req, res) => {
  try {
    const { name, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ name, password });
    await user.save();

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin by username and password
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid admin credentials' });
    }

    res.json({
      success: true,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;