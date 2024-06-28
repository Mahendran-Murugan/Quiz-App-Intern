const connection = require("../db");
const app = require("express")();

const createQuiz = (req, res, call) => {
  if (req.file) {
    console.log(req.file);
  }
  const body = req.body;
  // console.log(body);
  try {
    if (body.name && body.count && body.questions) {
      console.log(body.questions);
      connection.query(
        `insert into quizz( name , count) values ( "${body.name}" , ${body.count}) `,
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(404).json({
              status: "bad",
            });
            return;
          }

          body.questions.map((e) => {
            if (e.ch1 == undefined) e.ch1 = null;
            if (e.ch2 == undefined) e.ch2 = null;
            if (e.ch3 == undefined) e.ch3 = null;
            if (e.ch4 == undefined) e.ch4 = null;
            connection.query(
              `insert into question( quizid , question , ch1 , ch2 , ch3 , ch4 , answer , image , points) values (${result.insertId} , "${e.question}" ,"${e.ch1}", "${e.ch2}" ,"${e.ch3}" ,"${e.ch4}", "${e.answer}" ,"${e.image}" ,${e.points})`,
              (err, result, field) => {
                if (err) {
                  console.log(err);
                  res.status(404).json({
                    status: "bad",
                  });
                  return;
                }
                res.status(200).json({
                  status: "good",
                });
              }
            );
          });
        }
      );
    } else {
      res.json({
        status: "bad",
      });
    }
    return;
  } catch (ex) {
    console.log(ex);
  }
  res.end();
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
      connection.query(
        `delete from question where quizid=${req.params.id}`,
        (err1, result1, field1) => {
          if (err1) {
            console.log(err);
            return;
          }
          res.json({ status: "good" });
        }
      );
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
      connection.query(
        `update quizz set name = "${body.name}" , count = ${body.count} where id = ${body.id}`,
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(404).json({
              status: "bad",
            });
            return;
          }

          body.questions.map((e) => {
            if (e.ch1 == undefined) e.ch1 = null;
            if (e.ch2 == undefined) e.ch2 = null;
            if (e.ch3 == undefined) e.ch3 = null;
            if (e.ch4 == undefined) e.ch4 = null;
            connection.query(
              `update question  set question = "${e.question}" , ch1 = "${e.ch1}" , ch2 = "${e.ch2}" , ch3  ="${e.ch3}" , ch4 = "${e.ch4}" , answer  ="${e.answer}" , image = "${e.image}" , points = ${e.points} where quizid = ${body.id}`,
              (err, result, field) => {
                if (err) {
                  console.log(err);
                  res.status(404).json({
                    status: "bad",
                  });
                  return;
                }
                res.status(200).json({
                  status: "good",
                });
              }
            );
          });
        }
      );
    } else {
      res.json({
        status: "bad",
      });
    }
    return;
  } catch (ex) {
    console.log(ex);
  }
  res.end();
};

const updateQuestion = (req, res) => {
  const e = req.body;
  connection.query(
    `update question set quizid = ${e.quizid} ,question= "${e.question}" ,ch1="${e.ch1}",ch2= "${e.ch2}" ,ch3="${e.ch3}" ,ch4="${e.ch4}", answer="${e.answer}" ,image="${e.image}" ,points=${e.points} where id = ${req.params.id}`,
    (err, r, f) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json({ status: "good" });
      return;
    }
  );
};

const showQuestionsByID = (req, res) => {
  const { id } = req.body;
  if (isNaN(id)) {
    console.log("Error in id type");
    res.json({ status: "bad" });
    return;
  }
  connection.query(`SELECT * FROM QUESTION where ID = ${id}`, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(result);
    return;
  });
};
const showQuestions = (req, res) => {
  connection.query(`SELECT * FROM QUESTION `, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }
    res.json(result);
    return;
  });
};

module.exports = {
  createQuiz,
  deleteQuiz,
  updateQuestion,
  showQuestionsByID,
  showQuestions,
  updateQuiz,
};
