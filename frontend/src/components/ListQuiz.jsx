import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { Box, Container, Paper, Typography } from "@mui/material";
export const ListQuiz = () => {
  const [quizall, setQuiz] = useState([]);
  const [quizCount, setQuixCount] = useState(0);
  useEffect(() => {
    const res = axios
      .get("http://localhost:8000/api/user" + "/quiz/list")
      .then((res) => {
        setQuiz(res.data);
        // setQuixCount(quizall.length);
      });
  }, []);
  const quizStatus = quizCount > 0;

  return (
    <Container>
      {(quizStatus && (
        <h1>Welcome Students, These are {quizCount} quizes available </h1>
      )) || <h1>Welcome Students, These are no available quizes</h1>}
      <Box>
        {quizall.map((quiz, index) => {
          return (
            <Paper sx={{ m: 2, p: 2 }} key={index} elevation={5}>
              <Link to={`${quiz.id}`}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="h6" color="initial"></Typography>
                  <Typography variant="h6" color="initial">
                    {quiz.name.replace(/^./, quiz.name[0].toUpperCase())}
                  </Typography>
                  <Typography variant="h6" color="initial">
                    {quiz.count}
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
