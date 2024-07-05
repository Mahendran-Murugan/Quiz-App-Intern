const connection = require("./db");
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser({ extended: true }));
app.use("/Image", express.static(__dirname + "/Public"));
const cors = require("cors");
const { router } = require("./Router/adminRouter");
const routerUser = require("./Router/userRouter");
app.use(cors({ origin: "*" }));
connection.connect((err) => {
  if (err) {
    // console.log({
    //   host: process.env.DATABASE_HOSTNAME ,
    //   database: process.env.DATABASE_NAME,
    //   user: process.env.DATABASE_USERNAME ,
    //   password: process.env.DATABASE_PASSWORD ,

    // });
    console.log("DATABASE IS NOT CONNECTED");
    console.log(err);
    return;
  }
  console.log("Database Connected");

  app.use("/api/admin", router);
  app.use("/api/user", routerUser);

  app.listen(process.env.SERVER_PORT, () => {
    console.log("Server is running in ", process.env.SERVER_PORT || 4000);
  });
});

module.exports = app;
