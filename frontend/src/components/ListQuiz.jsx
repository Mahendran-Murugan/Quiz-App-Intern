import React, { useEffect, useState } from "react";
import { Link, NavLink, Navigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { QuestContext } from "../Context/QuestionContext";
export const ListQuiz = () => {
  const [quizall, setQuiz] = useState([]);
  const [quizCount, setQuixCount] = useState(0);
  const { QID, setQID, min, setMin, setAttempt } = QuestContext();
  useEffect(() => {
    axios.get("http://localhost:8000/api/user/quiz/list").then((res) => {
      setQuiz(res.data);
      setQuixCount(res.data.length);
      setMin(res.data.duration);
    });
  }, []);

  const handleClick = (index, id, attempt) => {
    setQID(id);
    setAttempt(attempt);
    setMin(quizall[index].duration);
  };

  const quizStatus = quizCount > 0;

  return (
    <Container>
      <center>
        {(quizStatus && (
          <Typography variant="h6">
            Welcome {localStorage.getItem("name")}, There are {quizCount}{" "}
            {quizCount > 1 ? "quizzes" : "quiz"} available{" "}
          </Typography>
        )) || (
          <Typography variant="h6">
            Welcome {localStorage.getItem("name")}, These are no available quiz
          </Typography>
        )}
      </center>
      <Box>
        {quizall.map((quiz, index) => {
          return (
            <Paper sx={{ m: 2, p: 2 }} elevation={5}>
              {localStorage.getItem("name") == "" && (
                <Navigate to="/login"></Navigate>
              )}
              <Link
                to={`${quiz.id}`}
                onClick={() => handleClick(index, quiz.id, quiz.attempt)}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Stack direction={"row"} spacing={3} alignItems={"center"}>
                    <Typography variant="button" color="initial">
                      {index + 1}
                    </Typography>
                    <Typography variant="button" color="initial">
                      {quiz.name.replace(/^./, quiz.name[0].toUpperCase())}
                    </Typography>
                  </Stack>
                  <Box spacing={2}>
                    <Typography variant="body" color="initial">
                      <Typography m={1} variant="button" color="initial">
                        {quiz.duration} minutes
                      </Typography>
                      <Typography m={1} color="primary" variant="button">
                        {quiz.count} Questions
                      </Typography>
                    </Typography>
                  </Box>
                </Box>
              </Link>
            </Paper>
          );
        })}
      </Box>
    </Container>
  );
};
