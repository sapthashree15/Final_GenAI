// routes/auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message
    res.status(201).send('User registered successfully');
  } catch (error) {
    // Handle errors and respond with an internal server error
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
