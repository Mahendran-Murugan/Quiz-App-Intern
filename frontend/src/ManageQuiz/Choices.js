import React, { useState, useImperativeHandle, forwardRef } from "react";
import { UseChoiceContext } from "./Form";
import { Grid, TextField, Button, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
const Choices = forwardRef(({ myChoices, count }, ref) => {
  const { question } = UseChoiceContext();

  const [choiceCount, setChoiceCount] = useState(count);
  const [choiceValue, setChoiceValue] = useState(question.choices);

  const handleChoiceCount = () => {
    question.choices = [...question.choices, ""];
    setChoiceValue([...choiceValue, ""]);
    setChoiceCount((p) => p + 1);
  };

  const handleChoiceDelete = () => {
    setChoiceValue(question.choices);
  };

  useImperativeHandle(ref, () => ({
    handleChoiceDelete,
  }));

  return (
    <>
      {question.choices.map((choice, ind) => (
        <Grid item xs={12} sm={6} key={ind}>
          <TextField
            required
            id={`choice${ind + 1}`}
            name="Choice"
            label={`Choice ${ind + 1}`}
            fullWidth
            onChange={(e) => {
              setChoiceValue((prevItems) => {
                const newItems = [...prevItems];
                newItems[ind] = e.target.value;
                return newItems;
              });
              question.choices[ind] = e.target.value;
            }}
            value={choice}
            autoComplete="shipping address-level2"
          />
        </Grid>
      ))}
      <Grid item xs={12} sm={6}>
        <Fab size="small" color="primary" onClick={handleChoiceCount}>
          <AddIcon />
        </Fab>
      </Grid>
    </>
  );
});

export default Choices;
