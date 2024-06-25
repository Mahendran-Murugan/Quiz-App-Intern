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
    const {id} = req.params
    connection.query(`SELECT * FROM QUESTION WHERE QUIZID = ${id}`, (err , result , field)=>{
      if(err){
        console.log(err);
        res.json({status : 404})
        return;
      }
      res.json(result)
    })
};

module.exports = { showAllQuiz, showSingleQuiz };
