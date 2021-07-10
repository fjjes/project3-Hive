require('./db')
const mongoose = require('mongoose');
require('./Survey')
const Schema = mongoose.Schema;

const answerSchema = new Schema({
department:{ 
    type:String,
    // required:true,
},
surveyNumber: Number,
version: String, 
answerArray:[ //id, answerType(flag(), answer(yes), date/time
    // {
    //     question: String,
    //     answer: []
    // }
]
})

// const answerSchema = new Schema({
//     department:{ 
//         type:String,
//         required:true,
//     },
//     survey:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Survey"
//     },
//     answerArray:[
//         {
//             question:{
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "Question"
//             },
//             answerType: String,
//             answer:String
//         }
//     ],
//     answeredDate: Date 
// })

module.exports = mongoose.model('Answer', answerSchema, 'answer');