const {
  showSingleQuiz,
  showAllQuiz,
  registerUser,
  loginUser,
} = require("../Model/userModel");
const routerUser = require("express").Router();

routerUser.get("/quiz/list", showAllQuiz);
routerUser.get("/quiz/:id", showSingleQuiz);
routerUser.post("/register", registerUser);
routerUser.post("/login", loginUser);
module.exports = routerUser;
