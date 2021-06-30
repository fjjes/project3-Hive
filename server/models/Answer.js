require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
department:{ 
    type:String,
    required:true,
},
surveyNumber: Number,
version: Number, //everyone in various levels in the organization get the same survey? are they different? different
answers:[
    {
        question: String,
        // answer: String,       //no textoptions for some of them!!!
        answer: [
            {
                texts:String,
                userInput:String
            }
        ]
    }
]
})

module.exports = mongoose.model('Answer', answerSchema, 'answer');