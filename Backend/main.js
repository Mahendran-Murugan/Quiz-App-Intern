const connection = require("./db");
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser({ extended: true }));
app.use(express.json());
const cors = require("cors");
const { router } = require("./Router/adminRouter");
app.use(cors({ origin: "*" }));
connection.connect((err) => {
  if (err) {
    console.log("DATABASE IS NOT CONNECTED");
    console.log(err);
    return;
  }
  console.log("Database Connected");

  app.use("/api/admin", router);

  app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log("Server is running in ", process.env.SERVER_PORT || 4000);
  });
});
