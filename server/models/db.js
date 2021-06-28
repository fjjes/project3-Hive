const mongoose = require ('mongoose');

// const mongoAtlasUrl = process.env.MONGODB_URL
const localMongoUrl = 'mongodb://localhost:27017/hivetest'

//mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose
  // .connect(mongoAtlasUrl, {
  .connect(localMongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  const db = mongoose.connection;

  db.once('open', (_) => 
    console.log("MongoDB is now connected to: ", localMongoUrl));
  //console.log("MongoDB is now connected to: ", process.env.MONGODB_URL));
  db.on('error', (err) => console.error('MongoDB connection error. :( ', err));
  