const mongoose = require("mongoose");

const boughtCourseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.ObjectId,
    required: [true],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: [true],
  },
});

const BoughtCourse = mongoose.model("BoughtCourse", boughtCourseSchema);
module.exports = BoughtCourse;
