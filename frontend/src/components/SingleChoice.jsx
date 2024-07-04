import {
  Container,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import React from "react";
import { FILE_SERVER } from "../data";
export const SingleChoice = ({ question, choice, index }) => {
  
  return (
    <>
      {question.isImage ? (
        <>
          {choice != "none" || choice ? (
            <img src={`${FILE_SERVER}/${choice}`} width={400} alt="No Image" />
          ) : (
            <img src="https://cdn4.iconfinder.com/data/icons/solid-part-6/128/image_icon-512.png" />
          )}
        </>
      ) : (
        <Typography variant="body1" color="initial">
          {choice}
        </Typography>
      )}
    </>
  );
};
