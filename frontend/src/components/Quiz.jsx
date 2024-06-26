import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

export const Quiz = () => {
  return (
    <Box className="h-screen flex justify-center items-center">
      <Outlet />
    </Box>
  );
};
