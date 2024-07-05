import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Tabbed from "../MUI/Tabbed";
import { Navigate, useNavigate } from "react-router-dom";
import CreateQuiz from "../ManageQuiz/CreateQuiz";
import { ADMIN_MAIL } from "../data";

export const Admin = () => {
  const navigate = useNavigate(0);
  React.useEffect(() => {
    if (localStorage.getItem("userid") !== ADMIN_MAIL) {
      navigate("/quiz");
    }
  });
  return (
    <Container>
      <Tabbed />
    </Container>
  );
};
