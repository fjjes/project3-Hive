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
    res.send(data);
  });


module.exports = router;