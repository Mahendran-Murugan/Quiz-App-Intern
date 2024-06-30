import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { store } from "../app/store";
export const Quiz = () => {

  let count = 0;

  const navigate = useNavigate();

  const handleVisibilityChange = () => {
    if (document.visibilityState == 'hidden') navigate('/');
  }

  const handleForbiddenKeys = (e) => {
    if (e.keyCode === 9 || e.keyCode === 91 || e.keyCode === 18 || e.keyCode === 17 || e.keyCode === 27) navigate('/');
    if (!document.fullscreenElement) navigate('/');
  }

  const fullscreenChanged = (e) => {
    e.preventDefault();
    count++;
    console.log(count);
    if (count > 1) navigate('/');
  }

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);

    document.addEventListener('keydown', handleForbiddenKeys);

    document.addEventListener('fullscreenchange', fullscreenChanged);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('keydown', handleForbiddenKeys);
      document.removeEventListener('fullscreenchange', fullscreenChanged);
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
