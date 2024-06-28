import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MyTable from "./MyTable";

const QuizManipulate = () => {
  const [questions, setQuestions] = useState([]);
  const AsyncFunction = async function () {
    const result = await axios.get("http://localhost:8000/api/user/quiz/list");
    setQuestions(result.data);
  };

  useEffect(() => {
    AsyncFunction();
  });
  return <MyTable rows={questions} />;
};

export default QuizManipulate;
