const express = require("express");
const { createQuiz } = require("../Model/adminModel");
const router = express.Router();
const upload = require("../Model/imageStorage");
router.post("/quiz/create", createQuiz);
router.get("/quiz/:?" , )

module.exports = { router };
