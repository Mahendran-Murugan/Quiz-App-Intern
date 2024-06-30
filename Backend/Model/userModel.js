const { json } = require("body-parser");
const connection = require("../db");
const showAllQuiz = (req, res) => {
  connection.query("SELECT * FROM QUIZZ", (err, result, fields) => {
    if (err) {
      console.log(err);
      res.end();
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
          res.json({ error: err.sqlMessage });
          return;
        }
        res.json(result);
      }
    );
  } catch (ex) {
    res.json(ex);
  }
};

const registerUser = (req, res) => {
  const { name, password, email } = req.body;

  if (name == "" && password == "" && email == "") {
    res.status(404).end();
  }
  connection
    .query(
      `INSERT INTO user (name , password , email) VALUES ("${name}" ,"${password}" ,"${email}")`
    )
    .on("error", (err) => {
      res.status(404).send();
    })
    .on("result", (result) => {
      res.status(200).json({
        status: "good",
      });
    });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  if (email == "" || password == "") res.status(404).json({ status: "error" });
  connection
    .query(
      `SELECT * FROM user where email = "${email}" and password = "${password}"`
    )
    .on("error", (err) => {
      res.status(404).json({ status: err });
    })
    .on("result", (result) => {
      res.status(200).json(result);
    });
};

const updateOrInsertAttempt = (req, res) => {
  const { quizid, userid } = req.body;

  if (!quizid || !userid) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const checkRecordSql = `SELECT id, attempt FROM attempt WHERE quizid = ? AND userid = ?`;
  connection.query(checkRecordSql, [quizid, userid], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database query failed" });
      return;
    }

    if (results.length > 0) {
      const currentAttempt = results[0].attempt;
      const newAttempt = currentAttempt + 1;

      const updateAttemptSql = `UPDATE attempt SET attempt = ? WHERE quizid = ? AND userid = ?`;
      connection.query(
        updateAttemptSql,
        [newAttempt, quizid, userid],
        (err, result) => {
          if (err) {
            res.status(500).json({ error: "Failed to update attempt count" });
            return;
          }
          res.json({
            message: "Attempt count updated successfully",
            newAttempt,
          });
        }
      );
    } else {
      const insertAttemptSql = `INSERT INTO attempt (quizid, userid, attempt) VALUES (?, ?, 1)`;
      connection.query(insertAttemptSql, [quizid, userid], (err, result) => {
        if (err) {
          res.status(500).json({ error: "Failed to insert new attempt" });
          return;
        }
        res.json({
          message: "New attempt inserted successfully",
          newAttempt: 1,
        });
      });
    }
  });
};

module.exports = {
  showAllQuiz,
  updateOrInsertAttempt,
  showSingleQuiz,
  registerUser,
  loginUser,
};
