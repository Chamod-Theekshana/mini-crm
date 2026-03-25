const bcrypt = require('bcryptjs');
const User = require('../models/User');
const env = require('../config/env');
const generateToken = require('../utils/generateToken');

const mapAuthResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
  token: generateToken({ id: user._id }, env.jwtSecret, env.jwtExpiresIn)
});

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      res.status(409);
      return next(new Error('Email already in use'));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword
    });

    return res.status(201).json(mapAuthResponse(user));
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      res.status(401);
      return next(new Error('Invalid credentials'));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      return next(new Error('Invalid credentials'));
    }

    return res.status(200).json(mapAuthResponse(user));
  } catch (error) {
    return next(error);
  }
};

const profile = async (req, res) => {
  return res.status(200).json({
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    createdAt: req.user.createdAt,
    updatedAt: req.user.updatedAt
  });
};

module.exports = {
  register,
  login,
  profile
};
