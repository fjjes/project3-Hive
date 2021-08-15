// Import express and express Router
const express = require('express');
const router = express.Router();

const Survey = require('../models/Survey')
const Answer = require('../models/Answer')
// Import Survey and Answer models
// Create GET /maps?survey=[surveyNumber]
router.get('/', async (req, res, next) => {
    const { surveyId } = req.query;
    console.log('Question Number: ', surveyId)
  
    let surveyData = await Survey.findOne({ _id: surveyId}).exec();

    console.log('Survey Data: ', surveyData)
    
    // Find the question number (or ID) with a question type of 'postal'
    // 1. Loop through `surveyData`
    
    const postalQuestion = surveyData.questions.find(element => element.questionType == 'postal');
    console.log(postalQuestion)
    
    // 2. In Answer model find all answers for the above question ID. Place them in an array.
    let answerData = await Answer.find({ survey: surveyData._id}).exec();

    console.log('Answer Data: ', answerData)

    const postalAnswers = answerData.map(element => element.answers[postalQuestion.questionNumber]);

    // 3. Send postal codes back to the client
    res.send(postalAnswers);
  });


module.exports = router;