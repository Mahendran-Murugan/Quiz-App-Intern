const {
  showSingleQuiz,
  showAllQuiz,
  registerUser,
  loginUser,
  showAllUser,
  editUser,
  deleteUser,
  updateOrInsertAttempt,
  getUserAttempts,
  updateUserScore,
  getUser,
  leaderShip,
  leaderShipByInstitute,
  fileData
} = require("../Model/userModel");
const routerUser = require("express").Router();

routerUser.get("/quiz/list", showAllQuiz);
routerUser.get("/list", showAllUser);
routerUser.get("/quiz/:id", showSingleQuiz);
routerUser.post("/register", registerUser);
routerUser.post("/login", loginUser);
routerUser.post("/edit", editUser);
routerUser.post("/delete", deleteUser);
routerUser.post("/attempt/get", getUserAttempts);
routerUser.put("/update/score/:id", updateUserScore);
routerUser.get("/get/userDetails/:id", getUser);
routerUser.post("/attempt/increase", updateOrInsertAttempt);
routerUser.get("/leadership", leaderShip);
routerUser.post("/studentPerformance", leaderShipByInstitute);
routerUser.get("/getReport/:institute_name", fileData);
module.exports = routerUser;
