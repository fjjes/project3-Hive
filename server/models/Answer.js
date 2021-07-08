require('./db')
const mongoose = require('mongoose');
require('./Survey')
const Schema = mongoose.Schema;

const answerSchema = new Schema({
department:{ 
    type:String,
    // required:true,
},
survey:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Survey"
},
// surveyNumber: Number,
// version: String, 
answerArray:[
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