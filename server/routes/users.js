const express = require('express');
const router = express.Router();

const User = require('../models/User')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  let data = await User.find({});
  console.info(`records retrieved from mongoose:`, 
  data?.length);
  res.send(data);
});

module.exports = router;
