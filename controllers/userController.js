const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
       const { email, password } = req.body;
       try {
              const user = await User.findOne({ email });
              if (!user) {
                     return res.status(400).json({ message: `Invalid username or password` });
              }

              // Compare with the hashpassword
              const isMatch = await bcrypt.compare(password, user.password);
              if (!isMatch) {
                     return res.status(400).json({ message: `Invalid username or password` });
              }
              // Generate the JWT token
              const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                     expiresIn: '1h'
              });
              res.status(200).json({ message: `Login successful`, token });

       } catch (error) {
              console.error('Error logging in user:', error);
              res.status(500).json({ message: 'Server error' });
       }
};

const createUser = async (req, res) => {
       try {
              const { username, email, password } = req.body;

              const existingUser = await User.findOne({ email });
              if (existingUser) {
                     res.status(400).json({ message: `User ${username} already exists` });
              }
              // Hash the password
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(password, salt);

              const newUser = new User({
                     username,
                     email,
                     password: hashedPassword
              })
              await newUser.save();
              // Generate a JWT token
              const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                     expiresIn: '1h'
              });
              console.log('Generated Token: ', token);
              res.status(200).json({ message: `User Created Successfully`, token });

       } catch (error) {
              res.status(500).json({ message: `Server Error: ${error}` })
       }
};
module.exports = { createUser, loginUser };