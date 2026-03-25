const express = require('express');
const {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} = require('../controllers/noteController');
const {
  noteIdValidator,
  createNoteValidator,
  updateNoteValidator
} = require('../validators/noteValidators');
const validateRequest = require('../middleware/validateRequest');
const protect = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.route('/').post(createNoteValidator, validateRequest, createNote).get(getNotes);

router
  .route('/:id')
  .get(noteIdValidator, validateRequest, getNoteById)
  .put(updateNoteValidator, validateRequest, updateNote)
  .delete(noteIdValidator, validateRequest, deleteNote);

module.exports = router;
