const express = require("express");
const router = express.Router();
const { SignUpUser, SignInUser } = require("../controllers/loginController");

// router.get("/login", (req, res) => {
//   res.status(200).send("logged in succesfully");
// });


router.get("/getreq",(req, res)=>{
  return res.status(200).send("yesss working")
})

router.post("/signup", SignUpUser);

router.post("/signin", SignInUser);

router.get("/students", async (req, res) => {
  const { page = 1, limit = 10, ...filters } = req.query;
  console.log("value of filters is", filters);
  console.log("req quety is", req.query)

  try {
    // let filter = {};
    // Construct the filter object based on the provided columns and filter values
    // if (Object.keys(filters).length > 0) {
    //   filter = Object.entries(filters).reduce((acc, [column, filterValue]) => {
    //     acc[column] = filterValue;
    //     return acc;
    //   }, {});
    // }
    //console.log("Vlue of filter  second is", filter);

    // Apply filtering and pagination using Mongoose query methods
    //   const students = await Student.find(filter)
    //     .skip((page - 1) * limit)
    //     .limit(Number(limit));

    // Retrieve the total count of students matching the filter
    //  const totalCount = await Student.countDocuments(filter);

    // Construct the response object with metadata and student details
    //   const response = {
    //     metadata: {
    //       totalStudents: totalCount,
    //       currentPage: Number(page),
    //       studentsPerPage: Number(limit),
    //     },
    //     students,
    //   };

    // Send the response as JSON
    // res.json(response);
    res.status(200).send("studentsssss sucess");
  } catch (error) {
    console.error("Error retrieving students:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
