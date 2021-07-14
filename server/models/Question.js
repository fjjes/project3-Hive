require('./db')
const mongoose = require('mongoose');
require('./Survey')
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question:{ 
        type:String,
        required:true,
    },
    questionType:{
        type: String,
        required:true
    },
    options:[] //could be an array of stings, arrary of objects or none
})

module.exports = mongoose.model('Question', questionSchema, 'question');