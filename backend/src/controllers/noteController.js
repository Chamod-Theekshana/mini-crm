const Note = require('../models/Note');

const createNote = async (req, res, next) => {
  try {
    const note = await Note.create({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      image: req.body.image,
      dueDate: req.body.dueDate || null,
      assignedTo: req.user._id
    });

    return res.status(201).json(note);
  } catch (error) {
    return next(error);
  }
};

const getNotes = async (req, res, next) => {
  try {
    const notes = await Note.find({ assignedTo: req.user._id }).sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    return next(error);
  }
};

const getNoteById = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, assignedTo: req.user._id });

    if (!note) {
      res.status(404);
      return next(new Error('Note not found'));
    }

    return res.status(200).json(note);
  } catch (error) {
    return next(error);
  }
};

const updateNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, assignedTo: req.user._id });

    if (!note) {
      res.status(404);
      return next(new Error('Note not found'));
    }

    const fields = ['title', 'description', 'status', 'image', 'dueDate'];
    fields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        note[field] = req.body[field];
      }
    });

    await note.save();
    return res.status(200).json(note);
  } catch (error) {
    return next(error);
  }
};

const deleteNote = async (req, res, next) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, assignedTo: req.user._id });

    if (!note) {
      res.status(404);
      return next(new Error('Note not found'));
    }

    await note.deleteOne();
    return res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
};
