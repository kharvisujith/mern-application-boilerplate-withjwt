const { arrayData } = require("../utils/data");
const EmployeeModel = require("../models/EmployeeModel");
// const checkData = (req, res) => {
// //   res.status(500).send("yes controllers working");
// // };

const fetchData = (req, res) => {
  res.status(500).send(arrayData);
};
const addEmployeeDetails = async (req, res) => {
  try {
    // alwas use this if we have multiple fiels upload.array("fieldname", 5)(here 5 is maxCount)

    const files = req.files; //array of files
    const userData = JSON.parse(req.body.userData); // this we need to specify exact key - array
    console.log(files, userData);

    // this is if we use upload.fileds([])
    // const files = req.files["myfiles"]; /// this will be an object if use upload.fields
    // const userData = JSON.parse(req.body["userData"]); // if we use formadta for sending json it will in text we need to parse it
    // console.log("user DAta is", userData[0]);

    // const result = await EmployeeModel.insertMany([
    //   {
    //     fileName: files[0].originalname,
    //     fileData: files[0].buffer,
    //     eid: userData[0].eid,
    //     name: userData[0].name,
    //   },
    // ]);
    //  console.log("result is ", result);

    res.status(200).send("keeeek");

    // if we use formadata then content-type will be multipart/formdata -> so everything including json should in formdata only
    //console.log("insdie addemployee controller", req.file, req.body);
    //console.log("request body is", req.body, req.file);
    // if single -> upload.single("fieldname") -> req.file -> direct file object
    // if multiple file -> upload.array("filedname", maxCount) -> req.files --> we get array of object for files with this key, we can map over array to get each file object
    // if both file and daata then -> upload.fields([{name:"myfiles", 5}, {name:"myjsonData"}]) --> now file will be in req.files object and  req.body is also object with key as we specifydata we can acces using req.body["myjsonData"]
    // if upload.any()
    // console.log("formdata files  is", req.files, "keeeeeeeeeek", req.body);
    // console.log(req.body["userData"]); // this will containe the json data that we are passing
    // const files = req.files; // this will be an object that contanes key that will have array of file fileds
    // const userData = req.body["userData"];

    // const file = req.file;
    // const fileBuffer = req.file.buffer;
    // const filename = req.file.originalname;
    // console.log("file name is", file, fileBuffer, filename);
    // if (
    //   !Array.isArray(req.body["userData"]) ||
    //   req.body["userData"]?.length < 1 ||
    //   req.files?.length < 1
    // ) {
    //   return res.status(400).json({ error: "Invlaid request body jakdjflkd" });
    // }

    // const files = req.files
    //const userData = req.body["userData"]

    // const uniqueIds = [...new Set(userData.map((cur) => cur.eid))];
    // console.log("uniqueIds is", uniqueIds);
    // if (req.body.length !== uniqueIds.length) {
    //   res.status(400).json({ error: "Do not iclude duplicate id's" });
    //   return;
    // }

    // const uniqueIds = [...new Set(req.body.map((cur) => cur.eid))];
    // console.log("uniqueIds is", uniqueIds);
    // if (req.body.length !== uniqueIds.length) {
    //   res.status(400).json({ error: "Do not iclude duplicate id's" });
    //   return;
    // }

    // const existingEmployee = await EmployeeModel.find({
    //   eid: { $in: uniqueIds },
    // });
    // console.log("exisitng Employeee is", existingEmployee);
    // if (existingEmployee.length > 0) {
    //   console.log("insde exisng if");
    //   res.status(409).json({ error: "Employee with same id already exist" });
    //   return;
    // }
    //console.log("after if");
    // const result = await EmployeeModel.create(req.body);
    // result.save();
    // const result = await EmployeeModel.insertMany(req.body);
    // console.log("result is", result);
    // res.status(201).json({ message: "Data added Succesfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in add Employee" });
  }
};

const getEmployeeDetails = async (req, res) => {
  try {
    const result = await EmployeeModel.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Error in get Employee details" });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    if (!Array.isArray(req.body) || req.body.length < 1) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const deleteData = req.body;
    //if we get array of object convert it to array using map and same query
    const result = await EmployeeModel.deleteMany({
      eid: { $in: deleteData },
    });

    if (result.deletedCount === 0) {
      res.status(404).json({ error: "NO matching records found for deletion" });
      return;
    }
    res
      .status(200)
      .json({ message: `${result.deletedCount} records were deleted` });
  } catch (error) {
    res.status(500).json({ error: "Error in delete Employee" });
  }
};

const updateEmployeeDetails = async (req, res) => {
  try {
    // const id = parseInt(req.params.id);
    const id = req.params.id;
    const updateData = req.body;
    if (
      !id ||
      typeof req.body !== "object" ||
      Object.keys(req.body).length < 1
    ) {
      res.status(400).json({ error: "Invlaid request params" });
      return;
    }
    const user = await EmployeeModel.findOneAndUpdate({ eid: id }, updateData, {
      new: true,
    });

    if (!user) {
      res.status(404).json({ error: "No matching data found to delete" });
      return;
    }
    res.status(200).json({ user: user });
  } catch (error) {
    res.status(500).json({ error: "Error in update Employee details" });
  }
};

module.exports = {
  addEmployeeDetails,
  fetchData,
  getEmployeeDetails,
  deleteEmployee,
  updateEmployeeDetails,
};

{
}
