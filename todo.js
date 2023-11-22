const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  dateCreated: { type: Date, default: Date.now },
  completed: Boolean,
  dateCompleted: Date,
});

module.exports = mongoose.model('Todo', todoSchema);