const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    maxlength: [20, "Name must be within 20 characters"],
    minlength: [4, "Name must be atleast 5 character long"],
    required: [true, "Nume is a must"],
  },
  details: {
    type: String,
    required: [true, "Course Details are required"],
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
