const fs = require("fs");
const Course = require("../Models/CoursesModel");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

//parsing data
const courseData = JSON.parse(
  fs.readFileSync(`${__dirname}/courses.json`, "utf-8")
);
const db = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(db).then(() => {
  console.log("MongoDB connection successful");
});

const importData = async () => {
  try {
    await Course.create(courseData);
    console.log("Data sent successfuly.!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
}
