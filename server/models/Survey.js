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
      type: String,
      questionNumber: Number,
      question: String,
      answerOptions: [{
        type: String
      }]
    }
  ],
  commentQuestion: String,
})

module.exports = mongoose.model('Survey', surveySchema, 'survey');