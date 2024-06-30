import { Box, Button, CssBaseline, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestContext } from "../Context/QuestionContext";
import axios from "axios";
import ReadInstructions from "../MUI/ReadInstructions";
export const QuizInstructions = ({ id }) => {
  const { QID, attempt } = QuestContext();
  const navigate = useNavigate();
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [limitAttempt, setLimitAttempts] = useState(attempt);
  useEffect(() => {
    if (QID != 0) {
      setLimitAttempts(attempt);
      const res = axios
        .post("http://localhost:8000/api/user/attempt/get/", {
          userid: localStorage.getItem("id"),
          quizid: QID,
        })
        .then((res) => {
          setCurrentAttempt(res.data.attempts);
        });
    }
  }, []);
  const navToQuestions = (e) => {
    e.preventDefault();
    if (QID != 0) {
      axios.post("http://localhost:8000/api/user/attempt/increase/", {
        quizid: QID,
        userid: localStorage.getItem("id"),
      });
      console.log(QID);
    }
    navigate("questions");
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      padding={1}
    >
      <Typography variant="h5" color="initial">
        You've {limitAttempt - currentAttempt} Attempts
      </Typography>
      {limitAttempt - currentAttempt > 0 && (
        <>
          <CssBaseline />
          <ReadInstructions />

          <Button
            sx={{ m: 4 }}
            variant="contained"
            onClick={(e) => navToQuestions(e)}
          >
            Accept & Contine
          </Button>
        </>
      )}
    </Box>
  );
};
