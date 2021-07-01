require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({
  surveyNumber: {
    type: Number, 
    unique: true, 
    required: true
  },
  narrative: String,
  questions: [
    {
      questionType: String,
      questionNumber: Number,
      question: String,
      answerOptions: []
    }
  ],
  commentQuestion: String,
})

module.exports = mongoose.model('Survey', surveySchema, 'survey');