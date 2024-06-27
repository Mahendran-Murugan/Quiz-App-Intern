import { Box } from "@mui/material";
import React from "react";
import Tabbed from "../MUI/Tabbed";
import { Navigate } from "react-router-dom";
import CreateQuiz from "../ManageQuiz/CreateQuiz";

export const Admin = () => {
  return (
    <Box className="flex justify-center items-center">
      {localStorage.getItem("name") == "" && <Navigate to="/login"></Navigate>}
      <Tabbed />
    </Box>
  );
};
