var express = require('express');
var router = express.Router();

const Answer = require('../models/Answer');

router.get('/', async (req, res) => {
    let data = await Answer.find({});
    console.info(`records retrieved from mongoose:`, data?.length)
    res.send(data);
  });

router.get('/:id', async function(req, res) {
    try {
        const data = await Answer.findOne({_id: req.params.id});
        console.info(`Found one survey answer record:`, data)
        res.send(data);
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
});

router.post('/', async (req, res) => {
    try {
        let newAnswer = new Answer(req.body)
        await newAnswer.save()
        console.log("Created a new answer record", newAnswer)
        res.send(newAnswer)  
    }
    catch (error) {
        console.log(error)
        res.sendStatus(500)
    }
})

router.put('/:id', async function(req, res) {
    let answerToUpdate = req.body
    try {
        let data = await Answer.findByIdAndUpdate(req.params.id, answerToUpdate);
        console.log("Updated Answer", data)
        res.send(data);
    }
    catch(error) {
        console.log(error)
        res.sendStatus(500)
    }
})

//delete using id , access code or email?
router.delete("/:id", async (req, res) => {
    try {
      const data = await Answer.findByIdAndDelete(req.params.id);
      if (!data) {
        res.sendStatus(404);
      } else {
        console.log("Deleted Answer", data);
        res.send(data);
      }
    } catch (error) {
      console.log(error)
      res.sendStatus(500)  }
  });

module.exports = router;