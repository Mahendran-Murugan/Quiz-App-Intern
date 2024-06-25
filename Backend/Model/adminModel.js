const connection = require("../db");

const createQuiz = (req, res, call) => {
  const body = req.body;
    try{

  if (body.name && body.count && body.questions) {
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
}catch(ex) {
    console.log(ex);
  }
};

module.exports = { createQuiz };
