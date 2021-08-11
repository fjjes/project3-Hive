// Import express and express Router
const express = require('express');
const router = express.Router();

const Survey = require('../models/Survey')
const Answer = require('../models/Answer')
// Import Survey and Answer models
// Create GET /maps?survey=[surveyNumber]
router.get('/', async (req, res, next) => {
    const { survey } = req.query;
    console.log(survey)
  
    let surveyData = await Survey.findOne({ surveyNumber: survey}).exec();

    console.log(surveyData)
    
    // Find the question number (or ID) with a question type of 'postal'
    // 1. Loop through `surveyData`
    
    const postalQuestion = surveyData.questions.find(element => element.questionType == 'postal');
    console.log(postalQuestion)
    
    // 2. In Answer model find all answers for the above question ID. Place them in an array.
    let answerData = await Answer.find({ survey: surveyData._id}).exec();

    console.log(answerData)

    const postalAnswers = answerData.map(element => element.answers[postalQuestion.questionNumber]);

    // 3. Send postal codes back to the client
    res.send(postalAnswers);
  });


module.exports = router;