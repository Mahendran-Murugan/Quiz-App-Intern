import { Box, ClickAwayListener } from "@mui/material";
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
          // Return to quiz if user confirms
          event.preventDefault(); // Prevent default navigation behavior
        }
        setCount(count - 1);
        event.preventDefault();
      }
    };

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    const handleMouseLeave = (event) => {
      if (
        event.clientY <= 0 ||
        event.clientX <= 0 ||
        event.clientX >= window.innerWidth ||
        event.clientY >= window.innerHeight
      ) {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("beforeunload", handleBeforeUnload);
      window.addEventListener("mouseleave", handleMouseLeave);
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
