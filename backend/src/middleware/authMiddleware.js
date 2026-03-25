const jwt = require('jsonwebtoken');
const User = require('../models/User');
const env = require('../config/env');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';

  if (!authHeader.startsWith('Bearer ')) {
    res.status(401);
    return next(new Error('Not authorized, missing token'));
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.jwtSecret);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      res.status(401);
      return next(new Error('Not authorized, user not found'));
    }

    req.user = user;
    return next();
  } catch (error) {
    res.status(401);
    return next(new Error('Not authorized, invalid token'));
  }
};

module.exports = protect;
