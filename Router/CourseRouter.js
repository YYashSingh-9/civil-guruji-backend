const express = require("express");
const CourseController = require("../Controllers/CourseController");
const courseRouter = express.Router();

courseRouter.route("/").get(CourseController.allCourse);
courseRouter.route("/:id").get(CourseController.oneCourse);
courseRouter.route("/buy").post(CourseController.buyCourse);

module.exports = courseRouter;
