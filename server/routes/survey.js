const express = require('express');
const router = express.Router();

const Survey = require('../models/Survey')

/* GET survey listing. */
router.get('/', async (req, res, next) => {
  let data = await Survey.find({});
  console.info(`records retrieved from mongoose:`, data?.length);
  res.send(data);
});

module.exports = router;
