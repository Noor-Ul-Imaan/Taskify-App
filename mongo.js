const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://Admin123:Admin123%40@taskify.rcgvhyp.mongodb.net/?retryWrites=true&w=majority&appName=TASKIFY"
  )
  .then(() => {
    console.log("mongodb connected");
  })
  .catch(() => {
    console.log("failed");
  });
// to make a schema
const newSchema = new mongoose.Schema({
  //   pass an oject
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const collection = mongoose.model("collection", newSchema);
//to get the collention in any file
module.exports = collection;
