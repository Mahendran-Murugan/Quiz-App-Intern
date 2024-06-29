import { Box } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { store } from "../app/store";
export const Quiz = () => {
  return (
    <Provider store={store}>
      <Box className="flex justify-center items-center">
        <Outlet />
      </Box>
    </Provider>
  );
};
