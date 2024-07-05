import { Box, Button, CssBaseline, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { QuestContext } from "../Context/QuestionContext";
import axios from "axios";
import { USER_SERVER } from "../data";
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
        .post(USER_SERVER + "/attempt/get/", {
          userid: localStorage.getItem("id"),
          quizid: QID,
        })
        .then((res) => {
          // console.log(res.data.attempts);
          setCurrentAttempt(res.data.attempts);
        });
    }
  }, []);
  const navToQuestions = (e) => {
    e.preventDefault();
    if (QID != 0) {
      axios.post(USER_SERVER + "/attempt/increase/", {
        quizid: QID,
        userid: localStorage.getItem("id"),
      });
      // console.log(QID);
    }

    const doc = document.documentElement;
    if (doc.requestFullscreen) doc.requestFullscreen();
    else if (doc.msRequestFullscreen) doc.msRequestFullscreen();
    else if (doc.msRequestFullscreen) doc.msRequestFullscreen();
    else if (doc.webkitRequestFullscreen) doc.webkitRequestFullscreen();
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
