const {
  showSingleQuiz,
  showAllQuiz,
  registerUser,
  loginUser,
  showAllUser,
  editUser,
  deleteUser,
} = require("../Model/userModel");
const routerUser = require("express").Router();

routerUser.get("/quiz/list", showAllQuiz);
routerUser.get("/list", showAllUser);
routerUser.get("/quiz/:id", showSingleQuiz);
routerUser.post("/register", registerUser);
routerUser.post("/login", loginUser);
routerUser.post("/edit", editUser);
routerUser.post("/delete", deleteUser);
module.exports = routerUser;
