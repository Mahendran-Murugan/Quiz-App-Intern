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
  const sql = "SELECT * FROM QUIZIMAGE WHERE QID = ?";
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
    connection
      .query(
        `insert into quizz( name , count , duration) values ( "${body.name}" , ${body.count} , ${body.duration}) `
      )
      .on("error", (err) => {
        console.log(err);

        res.end();
      })
      .on("result", (result) => {
        res.json({ id: result.insertId });
        body.questions.map((e) => {
          const json = JSON.stringify(Object.assign({}, e.choices));
          const sql = `INSERT INTO question (quizid, question, choices, answer, image, points)
          VALUES (?, ?, ?, ?, ?, ?)`;

          const values = [
            result.insertId,
            e.question,
            json,
            e.answer,
            e.image,
            e.points,
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

const updateQuiz = (req, res, call) => {
  if (req.file) {
    console.log(req.file);
  }

  const body = req.body;
  try {
    if (body.name && body.count && body.questions && body.id) {
      const updateQuizSql = `UPDATE quizz SET duration = ? , name = ?, count = ? WHERE id = ?`;
      const updateQuizValues = [body.duration , body.name, body.count, body.id];

      connection.query(updateQuizSql, updateQuizValues, (err, results) => {
        if (err) {
          console.error("Error updating quiz:", err);
          res.status(500).end();
          return;
        }

        const questionPromises = body.questions.map((e) => {
          const updateQuestionSql = `
                      UPDATE question 
                      SET question = ?, choices = ?, answer = ?, image = ?, points = ? 
                      WHERE quizid = ? 
                  `;
          const updateQuestionValues = [
            e.question,
            JSON.stringify(Object.assign({}, e.choices)),
            e.answer,
            e.image,
            e.points,
            body.id,
          ];
          console.log(updateQuestionValues);
          return new Promise((resolve, reject) => {
            connection.query(
              updateQuestionSql,
              updateQuestionValues,
              (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(results);
                }
              }
            );
          });
        });

        Promise.all(questionPromises)
          .then(() => {
            res.json({ status: "success" });
          })
          .catch((err) => {
            console.error("Error updating questions:", err);
            res.status(500).end();
          });
      });
    } else {
      res.json({ status: "bad" });
    }
  } catch (ex) {
    console.log(ex);
    res.status(500).end();
  }
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
    .query(`SELECT * FROM QUESTION where ID = ${id}`)
    .on("error", (err) => {
      res.status(404).json({ status: err });
    })
    .on("result", (result) => {
      res.status(200).json(result);
    });
};
const showQuestions = (req, res) => {
  connection.query(`SELECT * FROM QUESTION `, (err, result) => {
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
    `INSERT INTO QUESTION(question , answer , image , points , choices, quizid) values ( ? , ? , ? , ? , ? , ? ) `,
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
