const express = require("express");
const { createQuiz, deleteQuiz, updateQuestion } = require("../Model/adminModel");
const router = express.Router();
const upload = require("../Model/imageStorage");
router.post("/quiz/create", createQuiz);
router.get("/quiz/:?" , )
router.delete("/quiz/delete/:id" , deleteQuiz)
router.put("/update/question/:id",updateQuestion)

module.exports = { router };
