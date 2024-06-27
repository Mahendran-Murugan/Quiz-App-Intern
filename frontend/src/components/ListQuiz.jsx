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
  const { QID, setQID } = QuestContext();
  useEffect(() => {
    axios.get("http://localhost:8000/api/user/quiz/list").then((res) => {
      setQuiz(res.data);
      setQuixCount(res.data.length);
    });
  }, []);

  const handleClick = (id) => {
    setQID(id);
  };

  const quizStatus = quizCount > 0;

  return (
    <Container>
      <center>
        {(quizStatus && (
          <Typography variant="h6">
            Welcome {localStorage.getItem("name")}, These are {quizCount} quizes available{" "}
          </Typography>
        )) || (
          <h1>
            Welcome {localStorage.getItem("name")}, These are no available
            quizes
          </h1>
        )}
      </center>
      <Box>
        {quizall.map((quiz, index) => {
          return (
            <Paper sx={{ m: 2, p: 2 }} key={index} elevation={5}>
              {localStorage.getItem("name") == "" && (
                <Navigate to="/login"></Navigate>
              )}
              <Link to={`${quiz.id}`} onClick={() => handleClick(quiz.id)}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Stack direction={"row"} spacing={3} alignItems={"center"}>
                    <Typography variant="button" color="initial">
                      {index + 1}
                    </Typography>
                    <Typography variant="button" color="initial">
                      {quiz.name.replace(/^./, quiz.name[0].toUpperCase())}
                    </Typography>
                  </Stack>
                  <Typography variant="body" color="initial">
                    <Button color="primary">{quiz.count} Questions</Button>
                  </Typography>
                </Box>
              </Link>
            </Paper>
          );
        })}
      </Box>
    </Container>
  );
};
