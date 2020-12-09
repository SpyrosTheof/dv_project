const mongoose = require('mongoose');
const db = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDb connected');
  } catch (error) {
    console.log(error.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
