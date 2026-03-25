const { body, param } = require('express-validator');

const noteIdValidator = [
  param('id').isMongoId().withMessage('Invalid note id')
];

const createNoteValidator = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 160 }),
  body('description').trim().notEmpty().withMessage('Description is required').isLength({ max: 5000 }),
  body('status').optional().isIn(['weekly', 'monthly', 'personal', 'business', 'product', 'badge', 'internal', 'marketing', 'urgent']),
  body('image').optional().isString(),
  body('dueDate').optional({ nullable: true }).isISO8601().withMessage('dueDate must be a valid date')
];

const updateNoteValidator = [
  ...noteIdValidator,
  body('title').optional().trim().notEmpty().isLength({ max: 160 }),
  body('description').optional().trim().notEmpty().isLength({ max: 5000 }),
  body('status').optional().isIn(['weekly', 'monthly', 'personal', 'business', 'product', 'badge', 'internal', 'marketing', 'urgent']),
  body('image').optional().isString(),
  body('dueDate').optional({ nullable: true }).isISO8601().withMessage('dueDate must be a valid date')
];

module.exports = {
  noteIdValidator,
  createNoteValidator,
  updateNoteValidator
};
