import React, { useEffect, useState } from "react";
import { SingleChoice } from "./SingleChoice";
import { Alert, Box, Paper, RadioGroup, Typography } from "@mui/material";
import { UseAnswer } from "./Questions";
import CheckIcon from "@mui/icons-material/Check";

export const SingleQuestion = ({ question, index }) => {
  const [choices, setChoice] = useState([]);
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    setChoice([]);
    const ch1 = question.ch1;
    const ch2 = question.ch2;
    const ch3 = question.ch3;
    const ch4 = question.ch4;
    setAnswer(question.answer);

    if (question.ch1) setChoice((prev) => [...prev, ch1]);
    if (question.ch2) setChoice((prev) => [...prev, ch2]);
    if (question.ch3) setChoice((prev) => [...prev, ch3]);
    if (question.ch4) setChoice((prev) => [...prev, ch4]);
  }, []);

  const [select, setSelect] = useState("");
  const { setAnswered, setCorrect, isSubmitted } = UseAnswer();
  const handleSelect = (e) => {
    if (select == "") setAnswered((prev) => prev + 1);
    setSelect(e.target.value);
  };
  return (
    <Paper sx={{ m: 1, p: 2 }} elevation={3}>
      <Typography variant="h6">{`${index + 1}. ${
        question.question
      }`}</Typography>
      <Typography variant="h6" color="initial">
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=""
          onChange={(e) => handleSelect(e)}
          value={select}
        >
          {choices.map((choice, index) => (
            <SingleChoice key={index} choice={choice} />
          ))}
          {isSubmitted ? (
            select === answer ? (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                This is Correct
              </Alert>
            ) : select !== "" ? (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
                This is Correct
              </Alert>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </RadioGroup>
      </Typography>
    </Paper>
  );
};
