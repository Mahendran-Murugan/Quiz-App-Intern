import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { store } from "../app/store";
export const Quiz = () => {

  const navigate = useNavigate();

  const handleVisibilityChange = () => {
    if (document.visibilityState == 'hidden') navigate('/');
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
  }, [])

  return (
    <Provider store={store}>
      <Box className="flex justify-center items-center">
        <Outlet />
      </Box>
    </Provider>
  );
};
