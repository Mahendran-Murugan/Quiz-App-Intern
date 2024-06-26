const express = require("express");
const {
  createQuiz,
  deleteQuiz,
  updateQuestion,
  showQuestionsByID,
  showQuestions,
} = require("../Model/adminModel");
const router = express.Router();
const upload = require("../Model/imageStorage");
router.post("/quiz/create", createQuiz);
router.delete("/quiz/delete/:id", deleteQuiz);
router.put("/update/question/:id", updateQuestion);
router.get("/question/list", showQuestions);
router.get("/question/:id", showQuestionsByID);

module.exports = { router };
