const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SignUpUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res
        .status(400)
        .json({ error: "Please provide username, email and password" });
    }

    const user = await userModel.findOne({ name });
    if (user) {
      res.status(409).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    result.save();
  } catch (error) {
    res.status(500).send("Error in SignUP :: ", error);
  }
};

const SignInUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res
        .status(400)
        .json({ error: "Please provide username, email and password" });
    }

    let user = await userModel.findOne({ name: name });
    if (!user) {
      res.status(401).json({ error: "Invalid UserName" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid Password" });
    }

    const token = jwt.sign(
      { name, email, role: "superAdmin" },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Logged in succesfully", token: token });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = {
  SignUpUser,
  SignInUser,
};
