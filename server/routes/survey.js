const express = require('express');
const router = express.Router();
const Survey = require('../models/Survey')
const multer = require('multer')
const path = require('path')

const upload = multer({dest:"uploads"})
// const storage = multer.diskStorage({
// 	destination: function (request, file, callback) {
// 		callback(null, '/uploads');
// 	},

// 	filename: function (request, file, callback) {
// 		callback(null, Date.now() + file.originalname);
// 	},
// });

// const upload = multer({
// 	storage: storage,
// })


router.get('/image/uploads/:filename', function(req, res) {
	console.log(".", req.params)
	const filename = req.params.filename;
	console.log(filename)
	console.log(__dirname)
	try{
		const myPath = path.join(__dirname, '../uploads', filename)
		console.log("the right image", myPath)
		res.sendFile(myPath)
	} catch(error) {
		console.log("****", error)
	}
})

/* GET survey listing. */
router.get('/', async (req, res) => {
  let data = await Survey.find({});
  // console.log ("data", data)
  // console.info(`records retrieved from mongoose:`, data?.length);
  res.send(data);
});

router.get('/:id', async function(req, res) {
  try {
      const data = await Survey.findOne({_id: req.params.id});
      // console.info(`Survey options`, data)
      res.send(data);
  } catch (error) {
      // console.log(error)
      res.sendStatus(500)
  }
});

// Add GET/id/map (Prodyut)

router.post('/', upload.single('image'), async(req, res) => {
	console.log("hello", req.file);
	console.log("req.body", req.body)
	// console.log(req.files)
	const data = req.body
	let newSurvey = new Survey({
		surveyNumber: data.surveyNumber,
		company: data.company, 
		version: data.version,
		heading: data.heading,
		img: req.file == null?null: req.file.path,
		narrative: data.narrative,
		questions: JSON.parse(data.questions)
	})
	console.log("this is new survey", newSurvey)
	try {
		newSurvey = await newSurvey.save()
		console.log("Created a new survey record", newSurvey)
		res.send(newSurvey)
	}catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
	
})

// router.post('/', async(req, res) => {
// 	try {
// 		let newSurvey = new Survey(req.body)
// 		await newSurvey.save()
// 				console.log("Created a new survey record", newSurvey)
// 				res.send(newSurvey)  
// 	}
// 	catch (error) {
//       console.log(error)
//       res.sendStatus(500)
// 	}
// })



router.put('/:id', async function(req, res) {
  let surveyToUpdate = req.body
  try {
      let data = await Survey.findByIdAndUpdate(req.params.id, surveyToUpdate);
      console.log("Updated Survey", data)
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
    const data = await Survey.findByIdAndDelete(req.params.id);
    if (!data) {
      res.sendStatus(404);
    } else {
      console.log("Deleted Survey", data);
      res.send(data);
    }
  } catch (error) {
    console.log(error)
    res.sendStatus(500)  }
});

module.exports = router;
