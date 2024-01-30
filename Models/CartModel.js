const mongoose = require("mongoose");

const cartCourseSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.ObjectId,
    required: [true],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: [true],
  },
});

const CartCourse = mongoose.model("CartCourse", cartCourseSchema);
module.exports = CartCourse;
