const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    maxlength: [20, "Name must be within 20 characters"],
    minlength: [4, "Name must be atleast 5 character long"],
    required: [true, "Nume is a must"],
  },
  email: {
    type: String,
    required: [true, "E-mail is a must. Please fill it ."],
    validate: [validator.isEmail, "Please provide Valid email"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    minlength: [8, "Password must be at least 8 characters long."],
    required: [true, "Password is a must"],
    select: false,
  },
  loginDate: Date,
  msDate: Number,
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
