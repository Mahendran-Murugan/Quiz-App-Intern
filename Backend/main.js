const connection = require("./db");
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use("/Image", express.static(__dirname + "/Public"));
const cors = require("cors");
const { router } = require("./Router/adminRouter");
const routerUser = require("./Router/userRouter");
app.use(cors({ origin: "*" }));
connection.connect((err) => {
  if (err) {
    console.log("DATABASE IS NOT CONNECTED");
    console.log(err);
    return;
  }
  console.log("Database Connected");

  app.use("/api/admin", router);
  app.use("/api/user", routerUser);

  app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log("Server is running in ", process.env.SERVER_PORT || 4000);
  });
});

module.exports = app;
