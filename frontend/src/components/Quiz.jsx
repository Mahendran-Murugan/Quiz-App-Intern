import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { store } from "../app/store";
export const Quiz = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(2);

  return (
    <Provider store={store}>
      <Box className="flex justify-center items-center">
        <Outlet />
      </Box>
    </Provider>
  );
};
