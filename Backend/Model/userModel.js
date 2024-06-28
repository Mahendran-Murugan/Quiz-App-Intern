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

module.exports = { showAllQuiz, showSingleQuiz, registerUser, loginUser };
