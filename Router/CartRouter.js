const express = require("express");
const CourseController = require("../Controllers/CourseController");
const mailController = require("../Controllers/MailController");
const CartRouter = express.Router();
const User = require("../Models/UserModel");
const Course = require("../Models/CoursesModel");

CartRouter.route("/").get(CourseController.getAllCartItems);
CartRouter.route("/buy").post(
  CourseController.cartmodifier,
  async (req, res, next) => {
    if (req.body.courseId && req.body.userId) {
      const user = await User.findById(req.body.userId);
      const course = await Course.findById(req.body.courseId);
      if (course && user) {
        mailController.mailWrapper(
          user.email,
          "Course",
          `Dear ${user.name}, you added this course ${course.name} in your cart but didn't placed order.`
        );
        next();
      }
    }
  },
  CourseController.addToCartCourse
);

module.exports = CartRouter;
