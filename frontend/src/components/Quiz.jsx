import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { store } from "../app/store";
export const Quiz = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(2);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }

      if (
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.key === "Tab"
      ) {
        const req = window.confirm(
          "If you press a restricted key again, your attempt will be lost."
        );
        if (count <= 0) navigate("/");
        console.log(count);
        if (req) {
        const toggleFullScreen = () => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            if (document.exitFullscreen) {
              document.exitFullscreen();
            }
          }
        };
        } else {
          navigate("/");
        }
        event.preventDefault();
      }
    };

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <Provider store={store}>
      <Box className="flex justify-center items-center">
        <Outlet />
      </Box>
    </Provider>
  );
};
