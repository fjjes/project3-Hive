// const express = require('express');
// const router = express.Router();

// const Survey = require('../models/Survey')

// /* GET survey listing. */
// router.get('/', async (req, res) => {
//   let data = await Survey.find({});
//   console.log ("data", data)
//   console.info(`records retrieved from mongoose:`, data?.length);
//   res.send(data);
// });

// router.get('/:id', async function(req, res) {
//   try {
//       const data = await Survey.findOne({_id: req.params.id});
//       console.info(`Survey options`, data)
//       res.send(data);
//   } catch (error) {
//       console.log(error)
//       res.sendStatus(500)
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//       let newSurvey = new Survey(req.body)
//       await newSurvey.save()
//       console.log("Created a new survey record", newSurvey)
//       res.send(newSurvey)  
//   }
//   catch (error) {
//       console.log(error)
//       res.sendStatus(500)
//   }
// })

// router.put('/:id', async function(req, res) {
//   let surveyToUpdate = req.body
//   try {
//       let data = await Survey.findByIdAndUpdate(req.params.id, surveyToUpdate);
//       console.log("Updated Survey", data)
//       res.send(data);
//   }
//   catch(error) {
//       console.log(error)
//       res.sendStatus(500)
//   }
// })

// //delete using id , access code or email?
// router.delete("/:id", async (req, res) => {
//   try {
//     const data = await Survey.findByIdAndDelete(req.params.id);
//     if (!data) {
//       res.sendStatus(404);
//     } else {
//       console.log("Deleted Survey", data);
//       res.send(data);
//     }
//   } catch (error) {
//     console.log(error)
//     res.sendStatus(500)  }
// });

// module.exports = router;
