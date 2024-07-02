import React, { useEffect, useState } from "react";
import { SingleChoice } from "./SingleChoice";
import {
  Alert,
  Box,
  Grid,
  Paper,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { UseAnswer } from "./Questions";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { FILE_SERVER } from "../data";

export const SingleQuestion = ({ question, index }) => {
  
  const [choices, setChoice] = useState([]);
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    // console.log(question);
    setChoice(Object.values(JSON.parse(question.choices)));
    setAnswer(question.answer);
  }, []);
  const [select, setSelect] = useState("");
  const { setAnswered, setCorrect, isSubmitted, right, setRight } = UseAnswer();
  const handleSelect = (e) => {
    if (select == "") setAnswered((prev) => prev + 1);
    setSelect(e.target.value);
    if (e.target.value == question.answer) {
      const newNumbers = [...right];
      newNumbers.splice(index, 1, true);
      setCorrect(newNumbers.filter((a) => a == true).length);
      setRight(newNumbers);
    } else {
      const newNumbers = [...right];
      newNumbers.splice(index, 1, false);
      setCorrect(newNumbers.filter((a) => a == true).length);
      setRight(newNumbers);
    }
  };
  return (
    <Paper sx={{ m: 1, p: 2 }} elevation={3}>
      <Typography variant="h6">{`${index + 1}. ${
        question.question
      }`}</Typography>
      {question.image != "" && question.image != "none" && (
        <center>
          <img src={FILE_SERVER + "/" + question.image} alt="" width={650} />
        </center>
      )}
      <Typography variant="h6" color="initial">
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue=""
          onChange={(e) => handleSelect(e)}
          value={select}
        >
          <Stack gap={question.isImage ? 5 : 0} m={2}>
            {choices.map((choice, index) => (
              <SingleChoice question={question} choice={choice} />
            ))}
          </Stack>

          {isSubmitted ? (
            select === answer ? (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Correct Answer
              </Alert>
            ) : select !== "" ? (
              <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
                Wrong Answer.{" "}
                {!question.isImage
                  ? answer
                  : "Image " + (choices.indexOf(answer) + 1)}{" "}
                is Correct Answer
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
