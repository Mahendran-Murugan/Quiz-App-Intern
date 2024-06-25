const express = require("express");
const { createQuiz } = require("../Model/adminModel");
const router = express.Router();

router.post("/quiz/create", createQuiz);

module.exports = { router };
