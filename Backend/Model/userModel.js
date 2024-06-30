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
const showAllUser = (req, res) => {
  connection.query("SELECT * FROM user", (err, result, fields) => {
    if (err) {
      console.log(err);
      res.end();
      return;
    }
    res.json(result);
  });
};

const editUser = (req, res) => {
  const { name, email, password, id } = req.body;
  if (name == "" && password == "" && email == "") {
    console.log("Herre");
    res.status(404).end();
  }
  connection
    .query(`UPDATE user set name = "${name}", email = "${email}", password = "${password}" where id = ${id}`)
    .on("error", (err) => {
      res.status(404).json({
        status: err,
      });
    })
    .on("result", (result) => {
      res.status(200).json({
        status: "good",
      });
    });
};

const deleteUser = (req, res) => {
  const { body: { id } } = req;
  console.log(id);
  connection
    .query(`delete from user where id=${id}`)
    .on("error", (err) => {
      res.status(404).json({
        status: err,
      });
    })
    .on("result", (result) => {
      res.status(200).json({
        status: "good",
      });
    });
};

module.exports = { showAllQuiz, showSingleQuiz, registerUser, loginUser, showAllUser, editUser, deleteUser };
