const express = require("express");
const {
  createQuiz,
  deleteQuiz,
  updateQuestion,
  showQuestionsByID,
  showQuestions,
  updateQuiz,
} = require("../Model/adminModel");
const router = express.Router();
router.post("/quiz/create", createQuiz);
router.delete("/quiz/delete/:id", deleteQuiz);
router.put("/update/question/:id", updateQuestion);
router.get("/question/list", showQuestions);
router.get("/question/:id", showQuestionsByID);
router.put("/quiz/update/:id", updateQuiz);

module.exports = { router };
