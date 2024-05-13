const express = require("express");
const collection = require("./mongo");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// slash for login
app.get("/", cors(), (req, res) => {});
//in this post function we will geth data from login page
app.post("/", async (req, res) => {
  // on login page passing these value with the help of axios and here getiing them
  const { email, password } = req.body;

  try {
    // to login we check if that email already exists
    const check = await collection.findOne({
      email: email,
    });

    if (check) {
      //response which will just give back that this response exists
      res.json("exist");
    } else {
      //if email is new and doesnot exist
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});
//above code for login

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  // creating a new user and saving its info in database
  //  creating object which is data
  const data = {
    //created varibale here so that the email pass from boday should ne equal to this
    email: email,
    password: password,
  };

  try {
    //also check here too if there is email already
    const check = await collection.findOne({ email: email });

    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      //this will use to insert data of obj in mongodb
      await collection.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
});

app.listen(3000, () => {
  console.log("port connected");
});
