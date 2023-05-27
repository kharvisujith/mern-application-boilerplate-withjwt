const express = require("express");
const multer = require("multer");
// const bodyParser = require("body-parser");
//const { arrayData, dummy } = require("../utils/data");
//const loginMiddleware = require("../middlewares/loginMiddleware");
//const { fetchData } = require("../controllers/userController");
const {
  addEmployeeDetails,
  getEmployeeDetails,
  deleteEmployee,
  updateEmployeeDetails,
} = require("../controllers/userController");
const authenticateUser = require("../middlewares/loginMiddleware");

const router = express.Router();
// router.use(bodyParser.urlencoded({ extended: true }));

const storage = multer.memoryStorage();
// const upload = multer({ storage });
const upload = multer();

//router.use(loginMiddleware);

// router.get("/", (req, res) => {
//   console.log("arraydata");
//   res.status(200).send(arrayData);
// });
//router.post("/", addEmployeeDetails);//

//router.get("/controller", checkData);

//this can be used if there are no role complexty otherwise -> for each endpoint we have to call middlware
//router.use(authenticateUser(["adimn", "user"]));

router.get("/employees", authenticateUser(["admin"]), getEmployeeDetails);
router.post(
  "/employees",
  // authenticateUser(["admin", "user"]),
  // upload.single("myfile") // fieldname should be same as we pass in request
  upload.array("myfiles", 5),
  // upload.fields([{ name: "myfiles", maxCount: 10 }, { name: "userData" }]),
  addEmployeeDetails
);
router.delete(
  "/employees",
  authenticateUser(["admin", "customer"]),
  deleteEmployee
);
router.put(
  "/employees/:id",
  authenticateUser(["superAdmin"]),
  updateEmployeeDetails
);

module.exports = router;
