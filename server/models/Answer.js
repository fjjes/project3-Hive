require('./db')
const mongoose = require('mongoose');
require('./Survey')
const Schema = mongoose.Schema;

const answerSchema = new Schema({ 
survey:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Survey"
        },
answers:{},
answeredDate: Date 
})

module.exports = mongoose.model('Answer', answerSchema, 'answer');
