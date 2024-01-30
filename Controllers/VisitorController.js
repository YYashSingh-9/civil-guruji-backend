const CatchAsync = require("../Utils/CatchAsync");
const Visitors = require("../Models/VisitorsModel");

exports.catchVisitor = CatchAsync(async (req, res, next) => {
  const visitorData = await Visitors.create(req.body);
  res.status(200).json({
    status: "Success",
    data: visitorData,
  });
});
