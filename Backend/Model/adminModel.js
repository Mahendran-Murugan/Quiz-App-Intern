const connection = require("../db");
const app = require("express")();

function jsonConverter(arr) {
  return Object.assign({}, arr);
}

const createImageQuiz = (res, req) => {
  const { qid, qimage, chimage } = req.body;
  const sql =
    "INSERT into quizimage(qid , qimage , chimage) values = (? , ? , ? ,? )";
  const values = [qid, qimage, JSON.stringify(Object.assign({}, chimage))];
  connection
    .query(sql, values)
    .on("error", (err) => {
      console.log(err);
      res.end();
    })
    .on("result", (result) => {
      res.end();
    });
};

const showImageQuiz = (res, req) => {
  const sql = "SELECT * FROM quizimage WHERE qid = ?";
  const values = [res.params.id];
  connection
    .query(sql, values)
    .on("error", (err) => {
      console.log(err);
      res.end();
    })
    .on("result", (result) => {
      res.end(result);
    });
};

const createQuiz = (req, res, call) => {
  const body = req.body;
  console.log(body);
  if (body.name && body.count && body.questions) {
    const query =
      "INSERT INTO quizz (name, count, duration, attempt) VALUES (?, ?, ?, ?)";
    const values = [body.name, body.count, body.duration, body.attempt];

    connection
      .query(query, values)
      .on("error", (err) => {
        console.log(err);
        res.end();
      })
      .on("result", (result) => {
        res.json({ id: result.insertId });
        body.questions.map((e) => {
          const json = JSON.stringify(Object.assign({}, e.choices));
          const sql = `INSERT INTO question (quizid, question, choices, answer, image, points , isImage)
          VALUES (?, ?, ?, ?, ?, ? , ?)`;

          const values = [
            result.insertId,
            e.question,
            json,
            e.answer,
            e.image,
            e.points,
            e.isImage,
          ];
          connection
            .query(sql, values)
            .on("error", (err2) => {
              // console.log(err2);
              res.end();
            })
            .on("result", (result2) => {
              // console.log(result2);
              res.end(result.insertId);
              return;
            });
        });
        res.end();
      });
  }
};

const deleteQuiz = (req, res) => {
  if (isNaN(req.params.id)) {
    console.log("Error in id type");
    res.json({ status: "bad" });
    return;
  }
  connection.query(
    `delete from quizz where id=${req.params.id}`,
    (err, result, field) => {
      if (err) {
        console.log(err);
        return;
      }
      connection
        .query(`delete from question where quizid=${req.params.id}`)
        .on("error", (err) => {
          res.status(404).json({ status: err });
        })
        .on("result", (result) => {
          res.status(200).json(result);
        });
    }
  );
};

const updateQuiz = (req, res) => {
  const body = req.body;

  if (body.id && body.name && body.count && body.questions) {
    // Start a transaction
    connection.beginTransaction((err) => {
      if (err) {
        res.status(500).json({ error: "Transaction failed" });
        return;
      }

      const updateQuizSql = `UPDATE quizz SET name = ?, count = ?, duration = ? , attempt = ? WHERE id = ?`;
      const updateQuizValues = [
        body.name,
        body.count,
        body.duration,
        body.attempt,
        body.id,
      ];
      // console.log(updateQuizValues);
      connection.query(updateQuizSql, updateQuizValues, (err, result) => {
        if (err) {
          connection.rollback(() => {
            res.status(500).json({ error: "Quiz update failed" });
          });
          return;
        }

        // Get existing questions for the quiz
        const getQuestionsSql = `SELECT id FROM question WHERE quizid = ?`;
        connection.query(
          getQuestionsSql,
          [body.id],
          (err, existingQuestions) => {
            if (err) {
              connection.rollback(() => {
                res
                  .status(500)
                  .json({ error: "Failed to fetch existing questions" });
              });
              return;
            }

            const existingQuestionIds = existingQuestions.map((q) => q.id);
            const newQuestionIds = body.questions
              .map((q) => q.id)
              .filter((qid) => qid);

            const questionsToDelete = existingQuestionIds.filter(
              (qid) => !newQuestionIds.includes(qid)
            );

            if (questionsToDelete.length > 0) {
              const deleteQuestionsSql = `DELETE FROM question WHERE id IN (?)`;
              connection.query(
                deleteQuestionsSql,
                [questionsToDelete],
                (err, result) => {
                  if (err) {
                    connection.rollback(() => {
                      res
                        .status(500)
                        .json({ error: "Failed to delete removed questions" });
                    });
                    return;
                  }
                }
              );
            }

            let processedQuestions = 0;
            body.questions.forEach((q) => {
              const json = JSON.stringify(Object.assign({}, q.choices));

              if (q.id) {
                const updateQuestionSql = `UPDATE question SET question = ?, choices = ?, answer = ?, image = ?, points = ? , isImage = ? WHERE id = ?`;

                const updateQuestionValues = [
                  q.question,
                  json,
                  q.answer,
                  q.image,
                  q.points,
                  q.isImage,
                  q.id,
                ];
                // console.log(updateQuestionValues);
                connection.query(
                  updateQuestionSql,
                  updateQuestionValues,
                  (err, result) => {
                    if (err) {
                      connection.rollback(() => {
                        res.status(500).json({
                          error: `Failed to update question ID: ${q.id}`,
                        });
                      });
                      return;
                    }
                    processedQuestions++;
                    if (processedQuestions === body.questions.length) {
                      commitTransaction(res);
                    }
                  }
                );
              } else {
                const insertQuestionSql = `INSERT INTO question (quizid, question, choices, answer, image, points , isImage) VALUES (?, ?, ?, ?, ?, ? , ?)`;
                const insertQuestionValues = [
                  body.id,
                  q.question,
                  json,
                  q.answer,
                  q.image || "none",
                  q.points,
                  q.isImage,
                ];
                console.log(insertQuestionValues);
                connection.query(
                  insertQuestionSql,
                  insertQuestionValues,
                  (err, result) => {
                    if (err) {
                      connection.rollback(() => {
                        res
                          .status(500)
                          .json({ error: "Failed to insert new question" });
                      });
                      return;
                    }
                    processedQuestions++;
                    if (processedQuestions === body.questions.length) {
                      commitTransaction(res);
                    }
                  }
                );
              }
            });
          }
        );
      });
    });
  } else {
    res.status(400).json({ error: "Invalid request body" });
  }
};

// Function to commit the transaction
const commitTransaction = (res) => {
  connection.commit((err) => {
    if (err) {
      connection.rollback(() => {
        res.status(500).json({ error: "Transaction commit failed" });
      });
      return;
    }
    res.json({ message: "Quiz updated successfully" });
  });
};

const updateQuestion = (req, res) => {
  const e = req.body;
  connection
    .query(
      `update question set quizid = ${e.quizid} ,question= "${e.question}" ,ch1="${e.ch1}",ch2= "${e.ch2}" ,ch3="${e.ch3}" ,ch4="${e.ch4}", answer="${e.answer}" ,image="${e.image}" ,points=${e.points} where id = ${req.params.id}`
    )
    .on("error", (err) => {
      res.status(404).json({ status: err });
    })
    .on("result", (result) => {
      res.status(200).json(result);
    });
};

const showQuestionsByID = (req, res) => {
  const { id } = req.body;
  if (isNaN(id)) {
    console.log("Error in id type");
    res.json({ status: "bad" });
    return;
  }
  connection
    .query(`SELECT * FROM question where id = ${id}`)
    .on("error", (err) => {
      res.status(404).json({ status: err });
    })
    .on("result", (result) => {
      res.status(200).json(result);
    });
};
const showQuestions = (req, res) => {
  connection.query(`SELECT * FROM question `, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    re;
    s.json(result);
    return;
  });
};

const addQuestion = (req, res) => {
  const body = req.body;
  console.log(body);
  const values = [
    body.question,
    body.answer,
    body.image,
    body.points,
    body.choices,
    body.quizid,
  ];
  connection.query(
    `INSERT INTO question(question , answer , image , points , choices, quizid) values ( ? , ? , ? , ? , ? , ? ) `,
    values,
    (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      re;
      s.json(result);
      return;
    }
  );
};

module.exports = {
  createQuiz,
  addQuestion,
  deleteQuiz,
  showImageQuiz,
  updateQuestion,
  showQuestionsByID,
  showQuestions,
  createImageQuiz,
  updateQuiz,
};
