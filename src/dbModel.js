const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: String,
  answer: String
});

const DataBase = mongoose.model('DataBase', QuestionSchema);

module.exports = DataBase;