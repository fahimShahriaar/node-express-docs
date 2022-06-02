const express = require("express");
const app = express();
const mongoose = require("mongoose");
const activityLogHandler = require("./routeHandler/activityLogHandler");

// middlewares
app.use(express.json());

// DB connection
mongoose
  .connect("mongodb://localhost:27017/besure_demo")
  .then(() => console.log("DB connection established..."))
  .catch((err) => console.log(err));

// Application routes
app.use("/activity", activityLogHandler);

app.listen(5000, () => console.log("Server running on port: 5000"));
