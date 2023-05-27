const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRouter = require("./routes/Employee");
const loginRouter = require("./routes/Login");
const { errorHandle } = require("./middlewares/errorhandle");
const bodyParser = require("body-parser");

const app = express();
//app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log("error in connecting to mongodb ", error));

// order matters for middlware if below orderis changes authmidlware gets called for both routes
app.use("/api", loginRouter);
app.use("/api", userRouter);

app.listen(5000, () => {
  console.log("Listening to port 5000");
});

//mongodb+srv://sujithkharvi:keekkeek@cluster0.lglbgpz.mongodb.net/?retryWrites=true&w=majority
