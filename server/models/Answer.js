require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
personSurveyed:{ //access code, email, or name? Or all of them ? or populate from user model?
    type:String,
    required:true,
    unique:true
},
surveyNumber: Number,
version: Number, //everyone in various levels in the organization get the same survey? are they different?
answers:[
    {
        question: String,
        answer: String
    }
]
})

module.exports = mongoose.model('Answer', answerSchema, 'answer');