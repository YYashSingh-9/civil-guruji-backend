const CatchAsync = require("../Utils/CatchAsync");
const Course = require("../Models/CoursesModel");
const BoughtCourse = require("../Models/BoughtCourseModel");
const Cart = require("../Models/CartModel");
var mongoose = require("mongoose");
const User = require("../Models/UserModel");
const Mailer = require("../Controllers/MailController");

exports.buyCourse = CatchAsync(async (req, res, next) => {
  const course = await BoughtCourse.create(req.body);
  console.log(course);
  res.status(200).json({
    status: "Success",
    data: course,
  });
});

exports.allCourse = CatchAsync(async (req, res, next) => {
  const allCourses = await Course.find();
  res.status(200).json({
    status: "Successful",
    data: allCourses,
  });
});

exports.oneCourse = CatchAsync(async (req, res, next) => {
  const onecourseData = await Course.findById(req.params.id);
  res.status(200).json({
    status: "Success",
    data: onecourseData,
  });
});

exports.addToCartCourse = CatchAsync(async (req, res, next) => {
  const data = await Cart.create(req.body);
  res.status(200).json({
    status: "success",
    data: data,
  });
});

exports.getAllCartItems = CatchAsync(async (req, res, next) => {
  const data = await Cart.find();
  res.status(200).json({
    status: "success",
    data: data,
  });
});

exports.cartmodifier = CatchAsync(async (req, res, next) => {
  const idOne = req.body.userId;
  const idTwo = req.body.courseId;
  const uid = new mongoose.Types.ObjectId(idOne);
  const cid = new mongoose.Types.ObjectId(idTwo);

  console.log(idTwo, cid);
  req.body.userId = uid;
  req.body.courseId = cid;
  next();
});

exports.logintimeChecker = async () => {
  const allUsers = await User.find();
  console.log(allUsers);
  const logedOffUser = allUsers.filter((el) => {
    const oldms = el.msDate;
    const currMs = Date.now();
    const gapHours = currMs - oldms;
    if (gapHours >= 432000000) {
      return el;
    }
  });
  if (logedOffUser) {
    console.log(logedOffUser.email);
    logedOffUser.forEach((el) => {
      Mailer.mailWrapper(
        el.email,
        "User logged off",
        "you have been logged off for 5 days."
      );
    });
  }
};
