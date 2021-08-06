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
    let data = await Survey.find({ surveyNumber: survey}).exec();
    console.info(`records retrieved from mongoose:`, data?.length);

    // Find the question number (or ID) with a question type of 'postal'
    // 1. Loop through `data`
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

    // 2. Loop through each question object and add the first property where questionType == 'postal, to an array
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in

    // 3. In Answer model find all answers for the above question ID. Place them in an array.

    // Send postal codes back to the client
    res.send(data);
  });


module.exports = router;