const express = require("express");
const cors = require("cors");
const visitorRouter = require("./Router/VisitorRouter");
const userRouter = require("./Router/UserRouter");
const courseRouter = require("./Router/CourseRouter");
const CartRouter = require("./Router/CartRouter");
const errorController = require("./Controllers/ErrorController");

const app = express();

// * Global middleware (CORS) (Cross Origin Resource Sharing)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    exposedHeaders: ["SET-COOKIE"],
    methods: ["PATCH", "GET", "PUT", "POST", "HEAD", "DELETE"],
  })
);

//1. body parser
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/visitor", visitorRouter);
app.use("/api/v1/cart", CartRouter);
app.use(errorController);
module.exports = app;
