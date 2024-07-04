import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Tabbed from "../MUI/Tabbed";
import { Navigate } from "react-router-dom";
import CreateQuiz from "../ManageQuiz/CreateQuiz";

export const Admin = () => {
  return (
    <Container>
      <Tabbed />
    </Container>
  );
};
