const express = require("express");
const { createQuiz, deleteQuiz } = require("../Model/adminModel");
const router = express.Router();
const upload = require("../Model/imageStorage");
router.post("/quiz/create", createQuiz);
router.get("/quiz/:?" , )
router.delete("/quiz/delete/:id" , deleteQuiz)

module.exports = { router };
