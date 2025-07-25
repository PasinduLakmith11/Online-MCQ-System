const User = require('../models/User');
const bcrypt = require('bcrypt');

class UserController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ message: 'Invalid credentials' });

      res.json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  static async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const existing = await User.findOne({ email });
      if (existing) return res.status(400).json({ message: 'User already exists' });

      const hashed = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashed });
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully', user: { id: newUser._id, name: newUser.name, email: newUser.email } });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
}

module.exports = UserController;
