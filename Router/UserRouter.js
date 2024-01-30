// const userRouter
const express = require("express");
const userController = require("../Controllers/UserController");
const userRouter = express.Router();

userRouter
  .route("/signup")
  .post(userController.addCurrentTime, userController.signupUser);
userRouter
  .route("/login")
  .post(userController.addCurrentTime, userController.loginUser);

module.exports = userRouter;
