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
  const { name, password, userid } = req.body;

  if (name == "" && password == "" && userid == "") {
    res.status(404).end();
  }
  connection
    .query(
      `INSERT INTO user (name , password , userid) VALUES ("${name}" ,"${password}" ,"${userid}")`
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
  const { userid, password } = req.body;

  if (userid == "" || password == "") res.status(404).json({ status: "error" });
  connection
    .query(
      `SELECT * FROM user where userid = "${userid}" and password = "${password}"`
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
  const { name, userid, password, id } = req.body;
  if (name == "" && password == "" && userid == "") {
    res.status(404).end();
  }
  connection
    .query(
      `UPDATE user set name = "${name}", userid = "${userid}", password = "${password}" where id = ${id}`
    )
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
  const {
    body: { id },
  } = req;
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

const getUserAttempts = (req, res) => {
  const { quizid, userid } = req.body;

  if (!quizid || !userid) {
    res.status(400).json({ error: "Invalid request parameters" });
    return;
  }

  const getAttemptsSql = `SELECT attempt FROM attempt WHERE quizid = ? AND userid = ?`;
  connection.query(getAttemptsSql, [quizid, userid], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database query failed" });
      return;
    }

    if (results.length > 0) {
      res.json({ attempts: results[0].attempt });
    } else {
      res.json({ attempts: 0 });
    }
  });
};

const updateOrInsertAttempt = (req, res) => {
  // console.log(req.body);
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

const updateUserScore = (req, res) => {
  const userId = req.params.id;

  const { attendedQuestion, correctAnswer } = req.body;
  console.log(req.params.id, req.body);
  const getUserQuery = `SELECT attended, correct FROM user WHERE id = ?`;
  const updateUserQuery = `
    UPDATE user
    SET attended = attended + ?, correct = correct + ?
    WHERE id = ?
  `;

  connection.query(getUserQuery, [userId], (error, results) => {
    if (error) {
      console.error("Error fetching user data:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    connection.query(
      updateUserQuery,
      [attendedQuestion, correctAnswer, userId],
      (updateError, updateResults) => {
        if (updateError) {
          console.error("Error updating user data:", updateError);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.json({ message: "User data updated successfully" });
      }
    );
  });
};

const getUser = (req, res) => {
  const userId = req.params.id;

  connection.query(
    "SELECT name, userid, attended, correct FROM user WHERE id = ?",
    [userId],
    (error, results, fields) => {
      if (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (results.length > 0) {
        res.json(results[0]);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  );
};

const leaderShip = (req, res) => {
  const sql = `
    SELECT name, userid ,attended, correct
    FROM user
    ORDER BY attended DESC, correct DESC
    LIMIT 10;`;
  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error fetching leadership board:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }
    res.json(results);
  });
};
module.exports = {
  leaderShip,
  showAllQuiz,
  updateOrInsertAttempt,
  showSingleQuiz,
  registerUser,
  getUser,
  updateUserScore,
  loginUser,
  showAllUser,
  editUser,
  deleteUser,
  getUserAttempts,
};
