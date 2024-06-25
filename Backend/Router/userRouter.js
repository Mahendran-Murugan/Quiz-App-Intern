const { showSingleQuiz , showAllQuiz } = require("../Model/userModel");
const routerUser = require("express").Router()

routerUser.get("/quiz/list"  , showAllQuiz)
routerUser.get("/quiz/:id" , showSingleQuiz)

module.exports = routerUser