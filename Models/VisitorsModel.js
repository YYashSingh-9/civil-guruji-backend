const mongoose = require("mongoose");

const visitorsSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.ObjectId,
    required: [true],
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    required: [true],
  },
});

const Visitors = mongoose.model("Visitors", visitorsSchema);
module.exports = Visitors;
