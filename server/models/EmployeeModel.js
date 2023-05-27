const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  eid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    //required: true,
  },
  experience: {
    type: String,
    // required: true,
  },
  salary: {
    type: Number,
    // required: true,
  },
  fileName: {
    type: String,
  },
  fileData: {
    type: Buffer,
  },
});

const EmployeeModel = new mongoose.model("EmployeeModel", employeeSchema);

module.exports = EmployeeModel;
