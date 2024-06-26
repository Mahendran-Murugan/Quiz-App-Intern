import { FormControlLabel, Radio } from "@mui/material";
import React from "react";

export const SingleChoice = ({ choice, index }) => {
  return (
    <FormControlLabel
      sx={{ mt: 1, ml: 2 }}
      value={choice}
      label={choice}
      control={<Radio />}
    />
  );
};
