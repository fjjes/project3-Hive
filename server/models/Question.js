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
    options:[] 
})

module.exports = mongoose.model('Question', questionSchema, 'question');