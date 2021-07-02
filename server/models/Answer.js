require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema({
department:{ 
    type:String,
    required:true,
},
surveyNumber: Number,
version: String, //everyone in various levels in the organization get the same survey? are they different? different
answers:[
    {
        question: String,
        answer: [                //answer can be an array or a string !!!!!!!!!!!!!!
            // {
            //     texts:String,
            //     value:String
            // }
        ]
    }
]
})

module.exports = mongoose.model('Answer', answerSchema, 'answer');