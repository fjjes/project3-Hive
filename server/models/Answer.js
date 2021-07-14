require('./db')
const mongoose = require('mongoose');
require('./Survey')
const Schema = mongoose.Schema;

const answerSchema = new Schema({ //postal code?
survey:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Survey"
        },
answerArray:{},//id, answerType(flag(), answer(yes), date/time
answeredDate: Date 
})

module.exports = mongoose.model('Answer', answerSchema, 'answer');

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
//          // answerType: String,
//             answer:String                //array
//         }
//     ],
//     answeredDate: Date 
// })

