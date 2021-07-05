require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({ //unique link need to be added?
  surveyNumber: {
    type: Number, 
    unique: true, 
    required: true
  },
  company:String,
  version: String, //employee or executive???
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