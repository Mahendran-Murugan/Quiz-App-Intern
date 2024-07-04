import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import MyTable from "./MyTable";
import { Provider, useDispatch } from "react-redux";
import { store } from "../app/store";
import { USER_SERVER } from '../data'
import { addAction } from "../feature/imageQuizSlice";
const QuizManipulate = () => {
  const [quiz, setQuestions] = useState([]);
  const dispatch = useDispatch();
  const AsyncFunction = async function () {
    const result = await axios.get(USER_SERVER + "/quiz/list");
    setQuestions(result.data);
  };

  useEffect(() => {
    AsyncFunction();
  } , []);
  return <MyTable rows={quiz} />;
};

export default QuizManipulate;
