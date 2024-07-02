import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { QuestContext } from "../Context/QuestionContext";
import { USER_SERVER } from "../data";

export const ListQuiz = () => {
  const [quizall, setQuiz] = useState([]);
  const [quizCount, setQuixCount] = useState(0);
  const { setQID, setMin, setAttempt } = QuestContext();

  useEffect(() => {
    axios.get(USER_SERVER + "/quiz/list").then((res) => {
      setQuiz(res.data);
      setQuixCount(res.data.length);
    });
  }, []);

  const handleClick = (index, id, attempt, duration) => {
    setQID(id);
    setAttempt(attempt);
    setMin(duration);
  };

  const quizStatus = quizCount > 0;

  return (
    <Container>
      <Box sx={{ textAlign: "center" }}>
        {quizStatus ? (
          <Typography variant="h6">
            Welcome {localStorage.getItem("name")}, There are {quizCount}{" "}
            {quizCount > 1 ? "quizzes" : "quiz"} available{" "}
          </Typography>
        ) : (
          <Typography variant="h6">
            Welcome {localStorage.getItem("name")}, There are no available quizzes
          </Typography>
        )}
      </Box>
      <Box sx={{ mt: 2 }}>
        {quizall.map((quiz, index) => (
          <Paper key={quiz.id} sx={{ mb: 2, p: 2 }}>
            {localStorage.getItem("name") === "" && <Navigate to="/login" />}
            <Link
              to={`${quiz.id}`}
              onClick={() => handleClick(index, quiz.id, quiz.attempt, quiz.duration)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: { xs: "column", sm: "row" } }}>
                <Stack direction={"row"} spacing={3} alignItems={"center"}>
                  <Typography variant="button" color="initial">
                    {index + 1}
                  </Typography>
                  <Typography variant="button" color="initial">
                    {quiz.name.charAt(0).toUpperCase() + quiz.name.slice(1)}
                  </Typography>
                </Stack>
                <Box sx={{ mt: { xs: 1, sm: 0 }, ml: { xs: 0, sm: 2 }, textAlign: { xs: "center", sm: "left" } }}>
                  <Typography variant="body2" color="initial">
                    <Typography variant="caption" color="initial" sx={{ display: "block", mb: 1 }}>
                      {quiz.duration} minutes
                    </Typography>
                    <Typography variant="caption" color="primary">
                      {quiz.count} Questions
                    </Typography>
                  </Typography>
                </Box>
              </Box>
            </Link>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};
