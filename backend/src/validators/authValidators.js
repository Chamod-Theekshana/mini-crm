const { body } = require('express-validator');

const registerValidator = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2, max: 100 }),
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
  body('password').notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const loginValidator = [
  body('email').trim().notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
  body('password').notEmpty().withMessage('Password is required')
];

module.exports = {
  registerValidator,
  loginValidator
};
