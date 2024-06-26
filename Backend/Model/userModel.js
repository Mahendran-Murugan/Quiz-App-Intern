const { json } = require("body-parser");
const connection = require("../db");
const showAllQuiz = (req, res) => {
  connection.query("SELECT * FROM QUIZZ", (err, result, fields) => {
    if (err) {
      console.log(err);
      res.json({ status: 404 });
      return;
    }
    res.json(result);
  });
};
const showSingleQuiz = (req, res) => {
  try {
    const { id } = req.params;
    if (isNaN(id)) {
      console.log("Error in id type");
      res.json({ status: "bad" });
      return;
    }
    connection.query(
      `SELECT * FROM QUESTION WHERE QUIZID = ${id}`,
      (err, result, field) => {
        if (err) {
          console.log(err);
          res.json({ status: 404 });
          return;
        }
        res.json(result);
      }
    );
  } catch (ex) {
    res.json(ex);
  }
};

module.exports = { showAllQuiz, showSingleQuiz };
