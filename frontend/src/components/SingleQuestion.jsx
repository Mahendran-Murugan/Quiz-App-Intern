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
  useMediaQuery,
} from "@mui/material";
import { UseAnswer } from "./Questions";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { FILE_SERVER } from "../data";

export const SingleQuestion = ({ question, index }) => {
  const [choices, setChoice] = useState([]);
  const [answer, setAnswer] = useState("");
  const [select, setSelect] = useState("");
  const { setAnswered, setCorrect, isSubmitted, right, setRight } = UseAnswer();

  useEffect(() => {
    setChoice(Object.values(JSON.parse(question.choices)));
    setAnswer(question.answer);
  }, [question]);

  const isMobile = useMediaQuery("(max-width:600px)");
  const handleSelect = (e) => {
    if (select === "") setAnswered((prev) => prev + 1);
    setSelect(e.target.value);
    const isCorrect = e.target.value === question.answer;
    const newNumbers = [...right];
    newNumbers.splice(index, 1, isCorrect);
    setCorrect(newNumbers.filter((a) => a === true).length);
    setRight(newNumbers);
  };

  return (
    <Paper sx={{ m: 1, p: 2 }} elevation={3}>
      <Typography variant={isMobile ? "body1" : "h6"}>{`${index + 1}. ${
        question.question
      }`}</Typography>
      {question.image !== "" && question.image !== "none" && (
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <img
            src={FILE_SERVER + "/" + question.image}
            alt=""
            width={isMobile ? "100%" : "60%"}
            style={{ height: "auto" }}
          />
        </Box>
      )}
      <Typography variant="body1" color="initial">
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={select}
          onChange={handleSelect}
        >
          <Stack spacing={2} mt={2}>
            {choices.map((choice, index) => (
              <SingleChoice key={index} question={question} choice={choice} />
            ))}
          </Stack>

          {isSubmitted &&
            (select === answer ? (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Correct Answer
              </Alert>
            ) : (
              select !== "" && (
                <Alert icon={<CloseIcon fontSize="inherit" />} severity="error">
                  Wrong Answer.{" "}
                  {!question.isImage
                    ? answer
                    : `Image ${choices.indexOf(answer) + 1}`}{" "}
                  is Correct Answer
                </Alert>
              )
            ))}
        </RadioGroup>
      </Typography>
    </Paper>
  );
};
