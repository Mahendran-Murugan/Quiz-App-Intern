import { Box, Button, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { QuestContext } from "../Context/QuestionContext";
import axios from "axios";
export const QuizInstructions = ({ id }) => {
  const { QID } = QuestContext();
  const navigate = useNavigate();
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
    >
      <Paper elevation={3} sx={{ m: 0, p: 2 }}>
        Read the Questions properly
      </Paper>
      <br />
      <Button variant="contained" onClick={(e) => navToQuestions(e)}>
        Contine
      </Button>
    </Box>
  );
};
