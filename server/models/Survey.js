require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({ //unique link need to be added?
  surveyNumber: { //every 6 months surveys are sent
    type: Number,  
    required: true
  },
  company:{
    type: String,
    required:true
  },
  version:{ //employee or executive???
    type: String,
    required:true
  }, 
  narrative: String,
  questions:[
    {
      questionType:String,
      questionNumber: Number,
      question:String,
      answerOptions: []
    }
  ]
})

// const surveySchema = new Schema({ //unique link need to be added?
//   surveyNumber: { //every 6 months surveys are sent
//     type: Number, 
//     unique: true, 
//     required: true
//   },
//   company:String,
//   version: String, //employee or executive???
//   narrative: String,
//   questions:[{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Question"
//   }],
// })

module.exports = mongoose.model('Survey', surveySchema, 'survey');