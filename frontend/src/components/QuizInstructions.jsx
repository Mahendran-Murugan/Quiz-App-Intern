import { Box, Button, Paper } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const QuizInstructions = () => {
  const navigate = useNavigate();
  const navToQuestions = () => {
    navigate("questions");
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper elevation={3} sx={{ m: 0, p: 2 }}>
        Read the Questions properly
      </Paper>
      <br />
      <Button variant="contained" onClick={navToQuestions}>
        Contine
      </Button>
    </Box>
  );
};
