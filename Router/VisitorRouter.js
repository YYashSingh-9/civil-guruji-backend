const express = require("express");
const VisitorController = require("../Controllers/VisitorController");
const visitorRouter = express.Router();

visitorRouter.route("/").post(VisitorController.catchVisitor);

module.exports = visitorRouter;
