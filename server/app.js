let createError = require('http-errors');
let express = require('express');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let path = require('path')

//let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let answersRouter = require('./routes/answer');
let surveyRouter = require('./routes/survey');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/answer', answersRouter);
app.use('/api/survey', surveyRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.get("/api/images/:id", (req, res) => {
	console.log(req.params)
	res.sendFile("/uploads/"+req.params.id)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500)
  res.json({
    message: err.message,
    error: err
  })
});

module.exports = app;
