import React, { createContext, useContext, useEffect, useState } from "react";
import { SingleQuestion } from "./SingleQuestion";
import axios from "axios";
import { QuestContext } from "../Context/QuestionContext";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
const AnswerContext = createContext();
export const Questions = () => {
  const [data, setData] = useState([]);
  const { QID, setQID } = QuestContext();

  useEffect(() => {
    axios.get("http://localhost:8000/api/user/quiz/" + QID).then((res) => {
      setData(res.data);
      console.log(QID);
    });
  }, []);

  const [answed, setAnswered] = useState(0);
  const [isCorrect, setCorrect] = useState(0);
  const [isSubmitted, setSubmitted] = useState(false);
  return (
    <AnswerContext.Provider value={{ setAnswered, setCorrect, isSubmitted }}>
      <Stack sx={{ width: "70%" }}>
        <Stack direction={"row"} spacing={3}>
          <Typography variant="h5" color="initial">
            Questions {data.length}
          </Typography>
          <Typography variant="h5" color="initial">
            Answered {answed}
          </Typography>
        </Stack>
        {data.map((question, index) => {
          return <SingleQuestion index={index} question={question} />;
        })}

        <center>
          <Button
            variant="contained"
            onClick={(e) => {
              setSubmitted(true);
              alert(isCorrect);
            }}
          >
            Submit
          </Button>
        </center>
      </Stack>
    </AnswerContext.Provider>
  );
};
export const UseAnswer = () => {
  return useContext(AnswerContext);
};
