require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({ //need clientID or accesscode?
  name: {
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  organization: String,
  userLevel: String,  //Or position?
  // surveyNumber: {
  //   type: Number,
  // }
});

module.exports = mongoose.model('User', userSchema, 'users');