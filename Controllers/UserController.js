const UserModel = require("../Models/UserModel");
const CatchAsync = require("../Utils/CatchAsync");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

// Helper functions
const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createAndSendCookie = (user, statusCode, res) => {
  const token = signToken(user.id);
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    sameSite: "none",
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: user,
  });
};

exports.signupUser = CatchAsync(async (req, res, next) => {
  const user = await UserModel.create(req.body);
  console.log(user);
  if (!user) {
    return next(new AppError("Failed to create user", 400));
  }
  createAndSendCookie(user, 200, res);
});

exports.loginUser = CatchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Email or password is missing. Please re-enter"));
  }
  const user = await UserModel.findOne({ email }).select("+password");
  console.log(user);
  if (user.password === password) {
    console.log("passed");
  }
  createAndSendCookie(user, 200, res);
});

// Additional Middlewares
exports.addCurrentTime = (req, res, next) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  req.body.loginDate = date_ob;
  req.body.msDate = ts;
  next();
};
