// Import express and express Router
const express = require('express');
const router = express.Router();

const Survey = require('../models/Survey')
const Answer = require('../models/Answer')
// Import Survey and Answer models

// Create GET /maps?survey=[surveyID]
// https://stackoverflow.blog/2020/03/02/best-practices-for-rest-api-design/#h-allow-filtering-sorting-and-pagination
router.get('/', async (req, res, next) => {
    const { survey } = req.query;
    let surveyData = await Survey.findOne({ surveyNumber: survey}).exec();
    
    // Find the question number (or ID) with a question type of 'postal'
    // 1. Loop through `data`
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    
    const postalQuestion = surveyData.questions.find(element => element.questionType == 'postal');
    console.log(postalQuestion)
    // 3. In Answer model find all answers for the above question ID. Place them in an array.
    let answerData = await Answer.find({ survey: surveyData._id}).exec();

    const postalAnswers = answerData.map(element => element.answers[postalQuestion.questionNumber]);

    // Send postal codes back to the client
    res.send(postalAnswers);
  });


module.exports = router;